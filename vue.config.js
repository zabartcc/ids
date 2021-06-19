module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				"appId": "org.zabartcc.ids",
				"productName": "Albuquerque ARTCC IDS",
				"artifactName": "AlbuquerqueIDSInstall.${ext}",
				"win": {
					"publish": {
						"provider": "spaces",
						"name": "zabartcc",
						"region": "sfo3",
						"channel": "latest",
						"path": "/ids"
					}
				}
			},
			preload: 'src/preload.js'
		}
	}
}