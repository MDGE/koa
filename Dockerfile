
FROM node:16
RUN apt-get update && apt-get install -y apt-transport-https && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && apt-get update && apt-get install -y yarn
 
RUN yarn config set registry https://registry.npm.taobao.org --global && yarn config set disturl https://npm.taobao.org/dist --global
 
RUN npm config set registry https://registry.npm.taobao.org --global && npm config set disturl https://npm.taobao.org/dist --global
 
RUN npm install -g pm2

ADD ./start.sh /
RUN chmod +x /start.sh
 
EXPOSE 7001 7001
CMD ["/start.sh"]
