// 
describe("Login Page Functionalities", ()=>{
    let request;
    beforeEach(()=>{
        request = {
            body: {
                email: "fake@fakemail.com",
                password: "fakePass1!"
            }
        }
    });

    describe("Email Formatting", () => {    
        test.todo("Checks if @ sign exists");
        test.todo("Checks for valid mail server domain name");
    
    });
    
    describe("DB Authentication", ()=>{
        test.todo("Checks if User with the Email Exists");
    
        test.todo("Sends 400 OK if Password is Correct")
    })
});

