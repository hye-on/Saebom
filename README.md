<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```
Saebom
├─ .eslintrc.js
├─ .prettierrc
├─ README.md
├─ dist
│  ├─ app.controller.d.ts
│  ├─ app.controller.js
│  ├─ app.controller.js.map
│  ├─ app.module.d.ts
│  ├─ app.module.js
│  ├─ app.module.js.map
│  ├─ app.service.d.ts
│  ├─ app.service.js
│  ├─ app.service.js.map
│  ├─ common
│  │  ├─ errors
│  │  │  ├─ constants
│  │  │  │  ├─ error.constant.d.ts
│  │  │  │  ├─ error.constant.js
│  │  │  │  └─ error.constant.js.map
│  │  │  ├─ decorators
│  │  │  │  ├─ catch-errors.decorator.d.ts
│  │  │  │  ├─ catch-errors.decorator.js
│  │  │  │  └─ catch-errors.decorator.js.map
│  │  │  ├─ exceptions
│  │  │  │  ├─ app.exception.d.ts
│  │  │  │  ├─ app.exception.js
│  │  │  │  ├─ app.exception.js.map
│  │  │  │  ├─ base.exception.d.ts
│  │  │  │  ├─ base.exception.js
│  │  │  │  ├─ base.exception.js.map
│  │  │  │  ├─ discord.exception.d.ts
│  │  │  │  ├─ discord.exception.js
│  │  │  │  └─ discord.exception.js.map
│  │  │  ├─ filters
│  │  │  │  ├─ global.exception.filter.d.ts
│  │  │  │  ├─ global.exception.filter.js
│  │  │  │  └─ global.exception.filter.js.map
│  │  │  ├─ interceptors
│  │  │  │  ├─ discord-exception.interceptor.d.ts
│  │  │  │  ├─ discord-exception.interceptor.js
│  │  │  │  └─ discord-exception.interceptor.js.map
│  │  │  └─ types
│  │  │     ├─ error.type.d.ts
│  │  │     ├─ error.type.js
│  │  │     └─ error.type.js.map
│  │  └─ logger
│  │     ├─ logger.module.d.ts
│  │     ├─ logger.module.js
│  │     ├─ logger.module.js.map
│  │     ├─ logger.service.d.ts
│  │     ├─ logger.service.js
│  │     └─ logger.service.js.map
│  ├─ database
│  │  ├─ database.module.d.ts
│  │  ├─ database.module.js
│  │  ├─ database.module.js.map
│  │  ├─ entities
│  │  │  ├─ base.entity.d.ts
│  │  │  ├─ base.entity.js
│  │  │  ├─ base.entity.js.map
│  │  │  ├─ channel.entity.d.ts
│  │  │  ├─ channel.entity.js
│  │  │  ├─ channel.entity.js.map
│  │  │  ├─ index.d.ts
│  │  │  ├─ index.js
│  │  │  ├─ index.js.map
│  │  │  ├─ mock-exam-problem.entity.d.ts
│  │  │  ├─ mock-exam-problem.entity.js
│  │  │  ├─ mock-exam-problem.entity.js.map
│  │  │  ├─ mock-exam.entity.d.ts
│  │  │  ├─ mock-exam.entity.js
│  │  │  ├─ mock-exam.entity.js.map
│  │  │  ├─ motivation-message.entity.d.ts
│  │  │  ├─ motivation-message.entity.js
│  │  │  ├─ motivation-message.entity.js.map
│  │  │  ├─ notification.entity.d.ts
│  │  │  ├─ notification.entity.js
│  │  │  ├─ notification.entity.js.map
│  │  │  ├─ problem.entity.d.ts
│  │  │  ├─ problem.entity.js
│  │  │  ├─ problem.entity.js.map
│  │  │  ├─ review-schedule.entity.d.ts
│  │  │  ├─ review-schedule.entity.js
│  │  │  ├─ review-schedule.entity.js.map
│  │  │  ├─ user-mock-exam-result.entity.d.ts
│  │  │  ├─ user-mock-exam-result.entity.js
│  │  │  ├─ user-mock-exam-result.entity.js.map
│  │  │  ├─ user-problem-history.entity.d.ts
│  │  │  ├─ user-problem-history.entity.js
│  │  │  ├─ user-problem-history.entity.js.map
│  │  │  ├─ user.entity.d.ts
│  │  │  ├─ user.entity.js
│  │  │  └─ user.entity.js.map
│  │  ├─ migrations
│  │  │  ├─ Migration20250123085631.d.ts
│  │  │  ├─ Migration20250123085631.js
│  │  │  ├─ Migration20250123085631.js.map
│  │  │  ├─ Migration20250205081423.d.ts
│  │  │  ├─ Migration20250205081423.js
│  │  │  ├─ Migration20250205081423.js.map
│  │  │  ├─ Migration20250205081826.d.ts
│  │  │  ├─ Migration20250205081826.js
│  │  │  ├─ Migration20250205081826.js.map
│  │  │  ├─ Migration20250206114342.d.ts
│  │  │  ├─ Migration20250206114342.js
│  │  │  └─ Migration20250206114342.js.map
│  │  ├─ mikro-orm.config.d.ts
│  │  ├─ mikro-orm.config.js
│  │  ├─ mikro-orm.config.js.map
│  │  └─ types
│  │     ├─ answer-details.type.d.ts
│  │     ├─ answer-details.type.js
│  │     ├─ answer-details.type.js.map
│  │     ├─ answer.type.d.ts
│  │     ├─ answer.type.js
│  │     ├─ answer.type.js.map
│  │     ├─ channel.type.d.ts
│  │     ├─ channel.type.js
│  │     ├─ channel.type.js.map
│  │     ├─ cs-category.type.d.ts
│  │     ├─ cs-category.type.js
│  │     ├─ cs-category.type.js.map
│  │     ├─ difficulty.type.d.ts
│  │     ├─ difficulty.type.js
│  │     ├─ difficulty.type.js.map
│  │     ├─ index.d.ts
│  │     ├─ index.js
│  │     ├─ index.js.map
│  │     ├─ motivation.type.d.ts
│  │     ├─ motivation.type.js
│  │     ├─ motivation.type.js.map
│  │     ├─ notification.type.d.ts
│  │     ├─ notification.type.js
│  │     ├─ notification.type.js.map
│  │     ├─ problem.type.d.ts
│  │     ├─ problem.type.js
│  │     ├─ problem.type.js.map
│  │     ├─ review-step.type.d.ts
│  │     ├─ review-step.type.js
│  │     ├─ review-step.type.js.map
│  │     ├─ user-answer.type.d.ts
│  │     ├─ user-answer.type.js
│  │     └─ user-answer.type.js.map
│  ├─ main.d.ts
│  ├─ main.js
│  ├─ main.js.map
│  ├─ modules
│  │  ├─ discord
│  │  │  ├─ deploy-commands.service.d.ts
│  │  │  ├─ deploy-commands.service.js
│  │  │  ├─ deploy-commands.service.js.map
│  │  │  ├─ discord.gateway.d.ts
│  │  │  ├─ discord.gateway.js
│  │  │  ├─ discord.gateway.js.map
│  │  │  ├─ discord.init.service.d.ts
│  │  │  ├─ discord.init.service.js
│  │  │  ├─ discord.init.service.js.map
│  │  │  ├─ discord.module.d.ts
│  │  │  ├─ discord.module.js
│  │  │  └─ discord.module.js.map
│  │  ├─ discord-event
│  │  │  ├─ handlers
│  │  │  │  ├─ guild
│  │  │  │  │  ├─ guild.handler.d.ts
│  │  │  │  │  ├─ guild.handler.js
│  │  │  │  │  └─ guild.handler.js.map
│  │  │  │  ├─ handlers.module.d.ts
│  │  │  │  ├─ handlers.module.js
│  │  │  │  ├─ handlers.module.js.map
│  │  │  │  └─ interaction
│  │  │  │     ├─ button
│  │  │  │     │  ├─ button.handler.d.ts
│  │  │  │     │  ├─ button.handler.js
│  │  │  │     │  ├─ button.handler.js.map
│  │  │  │     │  ├─ implementations
│  │  │  │     │  │  ├─ daily-problem.answer.d.ts
│  │  │  │     │  │  ├─ daily-problem.answer.js
│  │  │  │     │  │  └─ daily-problem.answer.js.map
│  │  │  │     │  └─ interfaces
│  │  │  │     │     ├─ button.command.interface.d.ts
│  │  │  │     │     ├─ button.command.interface.js
│  │  │  │     │     └─ button.command.interface.js.map
│  │  │  │     └─ slash
│  │  │  │        ├─ implementations
│  │  │  │        │  ├─ daily-problem.d.ts
│  │  │  │        │  ├─ daily-problem.js
│  │  │  │        │  ├─ daily-problem.js.map
│  │  │  │        │  ├─ ping.d.ts
│  │  │  │        │  ├─ ping.js
│  │  │  │        │  ├─ ping.js.map
│  │  │  │        │  ├─ server.d.ts
│  │  │  │        │  ├─ server.js
│  │  │  │        │  ├─ server.js.map
│  │  │  │        │  ├─ user.d.ts
│  │  │  │        │  ├─ user.js
│  │  │  │        │  └─ user.js.map
│  │  │  │        ├─ interfaces
│  │  │  │        │  ├─ slash.command.interface.d.ts
│  │  │  │        │  ├─ slash.command.interface.js
│  │  │  │        │  └─ slash.command.interface.js.map
│  │  │  │        ├─ slash.command.registry.d.ts
│  │  │  │        ├─ slash.command.registry.js
│  │  │  │        ├─ slash.command.registry.js.map
│  │  │  │        ├─ slash.interaction.handler.d.ts
│  │  │  │        ├─ slash.interaction.handler.js
│  │  │  │        └─ slash.interaction.handler.js.map
│  │  │  └─ listeners
│  │  │     ├─ guild-create.listener.d.ts
│  │  │     ├─ guild-create.listener.js
│  │  │     ├─ guild-create.listener.js.map
│  │  │     ├─ interaction.listener.d.ts
│  │  │     ├─ interaction.listener.js
│  │  │     ├─ interaction.listener.js.map
│  │  │     ├─ interfaces
│  │  │     │  ├─ listener.interface.d.ts
│  │  │     │  ├─ listener.interface.js
│  │  │     │  └─ listener.interface.js.map
│  │  │     ├─ listeners.modules.d.ts
│  │  │     ├─ listeners.modules.js
│  │  │     └─ listeners.modules.js.map
│  │  ├─ domain
│  │  │  ├─ channel
│  │  │  │  ├─ channel.constant.d.ts
│  │  │  │  ├─ channel.constant.js
│  │  │  │  ├─ channel.constant.js.map
│  │  │  │  ├─ channel.module.d.ts
│  │  │  │  ├─ channel.module.js
│  │  │  │  ├─ channel.module.js.map
│  │  │  │  ├─ channel.service.d.ts
│  │  │  │  ├─ channel.service.js
│  │  │  │  └─ channel.service.js.map
│  │  │  └─ problem
│  │  │     ├─ problem.module.d.ts
│  │  │     ├─ problem.module.js
│  │  │     ├─ problem.module.js.map
│  │  │     ├─ problem.repository.d.ts
│  │  │     ├─ problem.repository.js
│  │  │     ├─ problem.repository.js.map
│  │  │     ├─ problem.service.d.ts
│  │  │     ├─ problem.service.js
│  │  │     └─ problem.service.js.map
│  │  └─ scheduler
│  │     ├─ scheduler.module.d.ts
│  │     ├─ scheduler.module.js
│  │     ├─ scheduler.module.js.map
│  │     ├─ services
│  │     │  ├─ daily-problem.scheduler.d.ts
│  │     │  ├─ daily-problem.scheduler.js
│  │     │  └─ daily-problem.scheduler.js.map
│  │     ├─ types
│  │     │  ├─ daily-problem-message.type.d.ts
│  │     │  ├─ daily-problem-message.type.js
│  │     │  └─ daily-problem-message.type.js.map
│  │     └─ utils
│  │        ├─ problem.message.util.d.ts
│  │        ├─ problem.message.util.js
│  │        └─ problem.message.util.js.map
│  └─ tsconfig.build.tsbuildinfo
├─ docker
│  ├─ docker-compose.yml
│  └─ init
│     ├─ 01-schema.sql
│     └─ 02-data.sql
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ common
│  │  ├─ decorators
│  │  │  └─ catch-errors.decorator.ts
│  │  ├─ errors
│  │  │  ├─ constants
│  │  │  │  └─ error-messages.ts
│  │  │  ├─ exceptions
│  │  │  │  ├─ app.exception.ts
│  │  │  │  ├─ base.exception.ts
│  │  │  │  └─ discord.exception.ts
│  │  │  ├─ index.ts
│  │  │  └─ types
│  │  │     └─ error.type.ts
│  │  └─ logger
│  │     ├─ logger.module.ts
│  │     └─ logger.service.ts
│  ├─ database
│  │  ├─ database.module.ts
│  │  ├─ entities
│  │  │  ├─ base.entity.ts
│  │  │  ├─ channel.entity.ts
│  │  │  ├─ index.ts
│  │  │  ├─ mock-exam-problem.entity.ts
│  │  │  ├─ mock-exam.entity.ts
│  │  │  ├─ motivation-message.entity.ts
│  │  │  ├─ notification.entity.ts
│  │  │  ├─ problem.entity.ts
│  │  │  ├─ review-schedule.entity.ts
│  │  │  ├─ user-mock-exam-result.entity.ts
│  │  │  ├─ user-problem-history.entity.ts
│  │  │  └─ user.entity.ts
│  │  ├─ migrations
│  │  │  ├─ .snapshot-saebom.json
│  │  │  ├─ Migration20250123085631.ts
│  │  │  ├─ Migration20250205081423.ts
│  │  │  ├─ Migration20250205081826.ts
│  │  │  └─ Migration20250206114342.ts
│  │  ├─ mikro-orm.config.ts
│  │  └─ types
│  │     ├─ answer-details.type.ts
│  │     ├─ answer.type.ts
│  │     ├─ channel.type.ts
│  │     ├─ cs-category.type.ts
│  │     ├─ difficulty.type.ts
│  │     ├─ index.ts
│  │     ├─ motivation.type.ts
│  │     ├─ notification.type.ts
│  │     ├─ problem.type.ts
│  │     ├─ review-step.type.ts
│  │     └─ user-answer.type.ts
│  ├─ main.ts
│  └─ modules
│     ├─ discord
│     │  ├─ deploy-commands.service.ts
│     │  ├─ discord.gateway.ts
│     │  ├─ discord.init.service.ts
│     │  └─ discord.module.ts
│     ├─ discord-event
│     │  ├─ handlers
│     │  │  ├─ guild
│     │  │  │  └─ guild.handler.ts
│     │  │  ├─ handlers.module.ts
│     │  │  └─ interaction
│     │  │     ├─ button
│     │  │     │  ├─ button.handler.ts
│     │  │     │  ├─ implementations
│     │  │     │  │  └─ daily-problem.answer.ts
│     │  │     │  └─ interfaces
│     │  │     │     └─ button.command.interface.ts
│     │  │     └─ slash
│     │  │        ├─ implementations
│     │  │        │  ├─ daily-problem.ts
│     │  │        │  ├─ ping.ts
│     │  │        │  ├─ server.ts
│     │  │        │  └─ user.ts
│     │  │        ├─ interfaces
│     │  │        │  └─ slash.command.interface.ts
│     │  │        ├─ slash.command.registry.ts
│     │  │        └─ slash.interaction.handler.ts
│     │  └─ listeners
│     │     ├─ guild-create.listener.ts
│     │     ├─ interaction.listener.ts
│     │     ├─ interfaces
│     │     │  └─ listener.interface.ts
│     │     └─ listeners.modules.ts
│     ├─ domain
│     │  ├─ channel
│     │  │  ├─ channel.constant.ts
│     │  │  ├─ channel.module.ts
│     │  │  ├─ channel.service.spec.ts
│     │  │  └─ channel.service.ts
│     │  └─ problem
│     │     ├─ problem.module.ts
│     │     ├─ problem.repository.ts
│     │     ├─ problem.service.spec.ts
│     │     └─ problem.service.ts
│     └─ scheduler
│        ├─ scheduler.module.ts
│        ├─ services
│        │  └─ daily-problem.scheduler.ts
│        ├─ types
│        │  └─ daily-problem-message.type.ts
│        └─ utils
│           └─ problem.message.util.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```