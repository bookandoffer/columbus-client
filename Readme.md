# bookandoffer

## Credentials

### Mailgun

user: mattmuelle+columbus@gmail.com
pass: testtest

### Graphcool

user: mattmuelle+columbus@gmail.com
pass: testtest

## Running the server locally

You'll need node 4.x or higher.

    npm install
    npm run dev

For production:

    npm start

## Models

### User

- [ ] email: String
- [ ] firstName: String
- [ ] lastName: String
- [ ] birthdate: DateTime
- [ ] courses: [Course]

### Courses

- [ ] type: String
- [ ] country: String
- [ ] address: String
- [ ] addressSecondary: String
- [ ] city: String
- [ ] postal: String
- [ ] images: [String]
- [ ] description: String
- [ ] title: String
- [ ] duration: Integer
- [ ] price: Integer
- [ ] groupSize: Integer
- [ ] startDate: Date
- [ ] startTime:
- [ ] endDate
- [ ] interval
