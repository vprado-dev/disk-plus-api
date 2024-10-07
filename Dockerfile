## Dependencies

FROM endeveit/docker-jq AS dependencies

COPY package.json /tmp/package.json

RUN jq '{ dependencies, devDependencies }' </tmp/package.json >/tmp/deps.json

## Build

FROM node:alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY --from=dependencies /tmp/deps.json ./package.json

COPY pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

## Server
FROM node:alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/package.json

COPY --from=build /usr/src/app/pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml

COPY --from=build /usr/src/app/build /usr/src/app/build

COPY --from=build /usr/src/app/.env.example /usr/src/app/.env.example

COPY --from=build /usr/src/app/schemas.yml /usr/src/app/schemas.yml

COPY --from=build /usr/src/app/LICENSE /usr/src/app/LICENSE

RUN pnpm install

CMD [ "pnpm", "start" ]