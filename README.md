# c21-tw-bad-group4

## Set up environment
```
├── private
│   ├── assets
│   ├── css
│   ├── js
│   └── html
├── public
│   ├── assets
│   ├── css
│   ├── js
│   └── html
├── middleware
│   └── isLoggedInGuard.ts
├── controller
│   ├── userController.ts
│   └── testing
│       └── userController.test
├── service
│   ├── userService.ts
│   └── testing
│       └── userService.test
├── routers
│   ├── signUp.ts
│   └── logIn.ts
├── migrations
├── seeds
├── sql
├── .gitignore
├── env
├── env.example
└── server.ts
```

## Workflow
- [ ] npm init
- [ ] npm install  ts-node typescript @types/node
- [ ] npm install express @types/express
- [ ] npm install -D ts-node-dev
- [ ] npm install express-session
- [ ] npm install -D @types/express-session
- [ ] npm install jsonfile @types/jsonfile
- [ ] npm install formidable @types/formidable
- [ ] npm install winston
- [ ] npm install --save-dev --save-exact prettier
- [ ] npm install pg @types/pg dotenv 
- [ ] npm install xlsx
- [ ] npm install socket.io
- [ ] npm install bcryptjs @types/bcryptjs
- [ ] npm install grant  dotenv @types/dotenv
- [ ] npm install cross-fetch
- [ ] yarn init -y
- [ ] yarn add --dev jest
- [ ] yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
- [ ] yarn ts-jest config:init
- [ ] yarn add knex pg @types/pg
- [ ] yarn knex init -x ts
- [ ] yarn add --dev playwright 
- [ ] yarn add redis @types/redis

## Tensorflow Installation
- [ ] Mac with Intel Chip: pip install --upgrade tensorflow
- [ ] Mac with M1 chip: pip install --upgrade tensorflow

## Save the installed version
- [ ] Mac with Intel: tensorflow==2.9.1
- [ ] Mac with M1: 
      tensorflow-macos==2.9.0
      tensorflow-metal==0.5.0
      protobuf==3.9.2

## Setup an environment using venv
- [ ] mkdir cats-and-dogs
- [ ] cd cats-and-dogs
- [ ] python -m venv tf_python
- [ ] source tf_python/bin/activate
- [ ] pip install --upgrade pip

## Config
### Prettier
- [ ] create a file of <.prettierrc>
```
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "overrides": [
        {
            "files": ["*.ts", "*.js"],
            "options": {
                "semi": true,
                "tabWidth": 2,
                "singleQuote": false,
                "printWidth": 100
            }
        }
    ]
}

```

### ts
- [ ] create a file of <tsconfig.json>
```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop": true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": ["node_modules", "build", "scripts", "index.js"]
}
```

### .gitignore
```
node_modules
.DS_Store
.env
package-lock.json

```
