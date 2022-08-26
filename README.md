# Laravel and React Auth Setup With Laravel Sanctum
## Api Setup
First, you should configure to env file. <br>
After you can start containers. <br>
Run root directory of api
```bash
./vendor/bin/sail up -d
```
Migrate Database
```bash
./vendor/bin/sail artisan migrate
``` 
If you wish seed the database, you can run this
```bash
./vendor/bin/sail artisan db:seed
```
For Testing to endpoints
```bash
./vendor/bin/sail artisan test
```
<hr>

## SPA Setup
First you should install node modules with. <br>
```bash
npm i
```
After installing node modules you can start project with
```bash
npm run dev
``` 
