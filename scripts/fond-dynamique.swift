// Un fond d'écran dynamique pour macOS : une image claire et une image
// sombre dans un seul fichier HEIC. Le Mac affiche l'une ou l'autre selon
// son apparence (clair ou sombre), et change tout seul au coucher du soleil
// si l'apparence est en « Automatique ».
//
// Le format est celui des fonds d'écran dynamiques d'Apple : une image
// HEIC par apparence, et dans la première une métadonnée XMP
// « apple_desktop:apr » : un plist binaire {"ap": {"l": index de l'image
// claire, "d": index de l'image sombre}} encodé en base64.
//
// Lancer : swift scripts/fond-dynamique.swift <claire.png> <sombre.png> <sortie.heic>
// Vérifier : swift scripts/fond-dynamique.swift --lire <fichier.heic>

import Foundation
import ImageIO
import UniformTypeIdentifiers

struct Apparence: Codable { let l: Int; let d: Int }
struct Racine: Codable { let ap: Apparence }

let NS = "http://ns.apple.com/namespace/1.0/" as CFString
let PREFIXE = "apple_desktop" as CFString

func image(_ chemin: String) -> CGImage {
    guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: chemin) as CFURL, nil),
          let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
        FileHandle.standardError.write("Image illisible : \(chemin)\n".data(using: .utf8)!)
        exit(1)
    }
    return img
}

let args = CommandLine.arguments

if args.count == 3 && args[1] == "--lire" {
    guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: args[2]) as CFURL, nil) else { print("illisible"); exit(1) }
    print("images :", CGImageSourceGetCount(src))
    for i in 0..<CGImageSourceGetCount(src) {
        if let img = CGImageSourceCreateImageAtIndex(src, i, nil) { print("  \(i) : \(img.width) × \(img.height)") }
    }
    if let md = CGImageSourceCopyMetadataAtIndex(src, 0, nil),
       let tag = CGImageMetadataCopyTagWithPath(md, nil, "apple_desktop:apr" as CFString),
       let valeur = CGImageMetadataTagCopyValue(tag) as? String,
       let data = Data(base64Encoded: valeur),
       let racine = try? PropertyListDecoder().decode(Racine.self, from: data) {
        print("apple_desktop:apr → clair = image \(racine.ap.l), sombre = image \(racine.ap.d)")
    } else {
        print("métadonnée apple_desktop:apr ABSENTE")
        exit(2)
    }
    exit(0)
}

guard args.count == 4 else {
    print("usage : swift fond-dynamique.swift <claire.png> <sombre.png> <sortie.heic>")
    exit(1)
}

let claire = image(args[1]), sombre = image(args[2])
let sortie = URL(fileURLWithPath: args[3])
guard let dest = CGImageDestinationCreateWithURL(sortie as CFURL, UTType.heic.identifier as CFString, 2, nil) else {
    print("Impossible de créer le HEIC"); exit(1)
}

let encodeur = PropertyListEncoder()
encodeur.outputFormat = .binary
let plist = try encodeur.encode(Racine(ap: Apparence(l: 0, d: 1)))

let md = CGImageMetadataCreateMutable()
CGImageMetadataRegisterNamespaceForPrefix(md, NS, PREFIXE, nil)
guard let tag = CGImageMetadataTagCreate(NS, PREFIXE, "apr" as CFString, .string, plist.base64EncodedString() as CFTypeRef) else {
    print("Impossible de créer la métadonnée"); exit(1)
}
CGImageMetadataSetTagWithPath(md, nil, "apple_desktop:apr" as CFString, tag)

let options = [kCGImageDestinationLossyCompressionQuality: 0.9] as CFDictionary
CGImageDestinationAddImageAndMetadata(dest, claire, md, options)
CGImageDestinationAddImage(dest, sombre, options)
if !CGImageDestinationFinalize(dest) { print("Écriture impossible"); exit(1) }
print("écrit :", sortie.path)
