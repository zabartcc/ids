module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				"appId": "org.zabartcc.ids",
				"productName": "Albuquerque ARTCC IDS",
				"artifactName": "AlbuquerqueIDSInstall.${ext}",
				"win": {
					"publish": {
						"provider": "s3",
						"bucket": "zabartcc/ids",
						"endpoint": "sfo3.digitaloceanspaces.com",
						"channel": "latest"
					}
				}
			}
		}
	}
  }