zip:
	zip -r project.zip . -x "node_modules/*" -x ".git/*"


run:
	pm2 start ecosystem.config.js --env production


up:
	rsync -avz --exclude='.next' --exclude='node_modules' -e 'ssh -i ~/Desktop/external_project/xone_chain/xone-Singapore.pem' ./dist/* ubuntu@54.179.234.198:/home/ubuntu/website