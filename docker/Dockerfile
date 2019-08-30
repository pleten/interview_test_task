FROM codeception/codeceptjs:latest

WORKDIR /tests

COPY package*.json ./
RUN npm install

COPY docker/entrypoint.sh /usr/local/bin/


RUN chmod 777 /usr/local/bin/entrypoint.sh \
&& ln -s /usr/local/bin/entrypoint.sh /

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]