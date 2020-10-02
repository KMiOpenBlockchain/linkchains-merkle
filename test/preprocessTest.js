/* test/sum.js */

var rewire = require('rewire');
var preprocess = rewire('../preprocess.js');
var assert = require('chai').assert;

describe('generatesIndexes', function() {

    context('one quad', function() {

        it('should equals', function() {
            cfg.data = [
                {
                    "datafile": "bio2rdf-affymetrix-20121004.nt",
                    "datafolder": "/quads/",
                    "divisor": "0x1",
                    "indexType": "object",
                    "lsd": 64,
                    "treesandindexes": 78
                }
            ];

            var json = preprocess.processAllData("<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n");
            assert.strictEqual(json, "[\n" +
                "   [\n" +
                "      \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
                "      [\n" +
                "         \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\\n\"\n" +
                "      ]\n" +
                "   ]\n]", "Not equal");
        })
    })

    context('ten quads', function() {

        it('should equals', function() {
            cfg.data = [
                {
                    "datafile": "bio2rdf-affymetrix-20121004.nt",
                    "datafolder": "/quads/",
                    "divisor": "0x1",
                    "indexType": "object",
                    "lsd": 64,
                    "treesandindexes": 78
                }
            ];

            var json = preprocess.processAllData("<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
                "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n");
            assert.strictEqual(json, "[\n" +
                "   [\n" +
                "      \"108057060919655353969319073675659250028494167884234799905735708689541595748352\",\n" +
                "      [\n" +
                "         \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"109712345170922327754172802984847226461498626584248267136657291440313367885514\",\n" +
                "      [\n" +
                "         \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"18645362278763824107654219945203274010736256873054573575897348405962450693316\",\n" +
                "      [\n" +
                "         \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"22844391522201213697110390822995328067160804261209017684891435534419587201171\",\n" +
                "      [\n" +
                "         \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"24086058646153361048031232919656368561633895468398362031513307474096020468002\",\n" +
                "      [\n" +
                "         \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"2976001247518796568546856218331785314596629773927085487023240100142798029486\",\n" +
                "      [\n" +
                "         \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"31108858850169876412248516986068047764137734614638451813532257278723912034546\",\n" +
                "      [\n" +
                "         \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"39423203430592103997374671506331876705003930407886206958728470964150059233118\",\n" +
                "      [\n" +
                "         \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"91437996877706251324771292122184075353815270300090615297889472638455983935350\",\n" +
                "      [\n" +
                "         \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\\n\"\n" +
                "      ]\n" +
                "   ],\n" +
                "   [\n" +
                "      \"99910448453385242779993927540246453719801988051318748741481413161083892885053\",\n" +
                "      [\n" +
                "         \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\\n\"\n" +
                "      ]\n" +
                "   ]\n" +
                "]", "Not equal");
        })
    })

    context('less digits', function() {

            it('should equals', function() {
                cfg.data = [
                    {
                        "datafile": "bio2rdf-affymetrix-20121004.nt",
                        "datafolder": "/quads/",
                        "divisor": "0xA",
                        "indexType": "object",
                        "lsd": 2,
                        "treesandindexes": 78
                    }
                ]
                var json = preprocess.processAllData("<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/2000/01/rdf-schema#label> \"affymetrix dataset by Bio2RDF on 2012-10-04 [bio2rdf_dataset:bio2rdf-affymetrix-20121004]\"  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://rdfs.org/ns/void#Dataset>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/created> \"2012-10-04\"^^<http://www.w3.org/2001/XMLSchema#date>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/creator> <https://github.com/bio2rdf/bio2rdf-scripts/blob/master/affymetrix/affymetrix.php>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/publisher> <http://bio2rdf.org>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"use-share-modify\"  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"attribution\"  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://purl.org/dc/terms/rights> \"restricted-by-source-license\"  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/ATH1-121501.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Bovine.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Canine.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Canine_2.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Celegans.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Chicken.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Citrus.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Cotton.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/DrosGenome1.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Drosophila_2.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/E_coli_2.na32.annot.nt.gz>  .\n" +
                    "<http://bio2rdf.org/bio2rdf_dataset:bio2rdf-affymetrix-20121004> <http://rdfs.org/ns/void#dataDump> <http://download.bio2rdf.org/rdf/affymetrix/Ecoli_ASv2.na32.annot.nt.gz>  .");
                assert.strictEqual(json, "[\n" +
                    "   [\n" +
                    "      \"0\",\n" +
                    "      [\n" +
                    "         \"7bec02ebbbae659711e5a093947882220dbc1f857092862e81f1c813db4f55e4\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"11\",\n" +
                    "      [\n" +
                    "         \"79892d3addd677abcc7451dcb8b098f81a976987c035f9d8b0ea56ae9d558f18\\n\",\n" +
                    "         \"318d0d4f4687f612388d2c3397b17b9720bb51d2915efa99eaf97d854aae7dcc\\n\",\n" +
                    "         \"d47ec3b234895b897eee46b388760852599b06d037661de58d561662e25a41f2\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"14\",\n" +
                    "      [\n" +
                    "         \"c1fcd6ed7f92652191c485dfc30f1af44e091af68094f279cfdd92c342f3dd1e\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"16\",\n" +
                    "      [\n" +
                    "         \"cde2d8c978dfd9fd3018f5c243b6227339512e9e2adc101af4a130a5edf2ae5e\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"17\",\n" +
                    "      [\n" +
                    "         \"097f7209a6d2ead48258990bcb4f2fc97d1930893e6a50ce10349b89164b9517\\n\",\n" +
                    "         \"e1d62565a10af2617660a74c834011054ac665b1d36d2b9ee4874bc06a0d28e7\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"19\",\n" +
                    "      [\n" +
                    "         \"c7e7910bfc8c2a258ba061bd8627ab78bb9db3b9dc9d0b68c8630bd0786fb59c\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"20\",\n" +
                    "      [\n" +
                    "         \"b7af01bf84198e2a2111adedbffecdef33b63a25d7fada0240663b3e100c4ece\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"21\",\n" +
                    "      [\n" +
                    "         \"b6cbed171d586a2ef654fdc8cd16aae70a3af9b2ef6e04e60d7a84a4950f2065\\n\",\n" +
                    "         \"ef3a21fcd886ff8c1ddfa0c18e2a7c722ebe2ca89c745bbfe9705ac12e4e04d3\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"22\",\n" +
                    "      [\n" +
                    "         \"dc4b3a4c305c135792dd49b10cb0438ee341f044369934e7a59513005aa711ee\\n\",\n" +
                    "         \"f0892e322c05f11075564e372470b4a676adc0636baa8281c41dff95477019c2\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"24\",\n" +
                    "      [\n" +
                    "         \"39794d6b2efc3b4e974753bde38c7070d30ddf3b5b0bff23c56bf42a923ba433\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"3\",\n" +
                    "      [\n" +
                    "         \"3551024291e2998a1a452642deb45bc424a9969ec801047263822570045d7781\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"6\",\n" +
                    "      [\n" +
                    "         \"b83b6dc5be3e15b1ca4664b1bd288c92dda3f2e1ec6fe21f9c3d13e07eb6ec94\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"7\",\n" +
                    "      [\n" +
                    "         \"2f526d48bd043347eabfbc7ef43410de7e8c00f91b388790c590202e4466950b\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"8\",\n" +
                    "      [\n" +
                    "         \"a00a9964ff1bcde9e603c745039fa076b2952bcaa45d3a148cea366b2ba79a44\\n\"\n" +
                    "      ]\n" +
                    "   ],\n" +
                    "   [\n" +
                    "      \"9\",\n" +
                    "      [\n" +
                    "         \"b114241a13cac2a4417935b18e0d822d4b2596fe0df914618a5af1bbcd213d88\\n\"\n" +
                    "      ]\n" +
                    "   ]\n" +
                    "]", "Not equal");
            })
    })
})