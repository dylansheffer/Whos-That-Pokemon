FROM graphile/postgraphile:latest

# Install PostGraphile and PostGraphile connection filter plugin
RUN npm install -g postgraphile
RUN npm install -g postgraphile-plugin-connection-filter
RUN npm install -g @graphile-contrib/pg-simplify-inflector

EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]
