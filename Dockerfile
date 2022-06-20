FROM node:16
# RUN apt-get update && apt-get install -y apt-transport-https && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && apt-get update && apt-get install -y yarn
 
# RUN yarn config set registry https://registry.npm.taobao.org --global && yarn config set disturl https://npm.taobao.org/dist --global
 
# RUN npm config set registry https://registry.npm.taobao.org --global && npm config set disturl https://npm.taobao.org/dist --global
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g

COPY . .

EXPOSE 7001

CMD npm run start
# docker run -d -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -p 9620:8080 -p 50000:50000 jenkins/jenkins
