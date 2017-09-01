### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: jade
- **CSS Framework**: bootstrap
- **CSS Preprocessor**: css
- **JavaScript Framework**: react
- **Build Tool**: webpack
- **Unit Testing**: none
- **Database**: mongodb
- **Authentication**: email
- **Deployment**: none

### How to Run
Clone the repository.
```
git clone https://github.com/choch-o/BudgetTrend-v1.git
```
Install necessary node packages. Inside directory `BudgetTrend-v1`,
```
npm install
```
Create a `.env` file.
```
vi .env
```
Inside `.env` file, configure MongoDB url (`localhost` for example).
```
MONGODB='localhost'
```

Run.
```
npm start
```

### License
The MIT License (MIT)

Copyright (c) 2016 Hyunsung Cho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
