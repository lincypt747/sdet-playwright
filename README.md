1.	API testing:  sdetProject/apiTest/apiTest.spec.ts

    a. Get test case, Post test case, Use API Returned Results in a Workflow, Collect Data and Create Artifact

    b. artifact file: sdetProject\apiTest\artifact.json (Reverse the order and select the last 5 items)

2.	Login verification, negative testing and positive test: sdetProject/sauce-demo/login-verification.spec.ts

    a.	Negative tests : password required, user name required and verify the error messages

    b.	Login verification with standard username and password

    c.	Page objects are under : sdetProject/page-objects/sauce-demo

    d. 	Data file: sdetProject/sauce-demo/data.json
    
3.	End-to-end workflow; sdetProject/sauce-demo/sauce-demo-buy-item.spec.ts

    a.	Login > Verify the product > Add item to cart  >  Open shopping cart > Checkout > Checkout overview > Complete order

    b.	Page objects are under : sdetProject/page-objects/sauce-demo

    c.	Data file: sdetProject/sauce-demo/data.json
    
4.	Additional test cases: sdetProject/sauce-demo/reset-app-state.spec.ts

    a.	This has test cases to test continue shopping, hamburger menu, reset app state and logout

    b.	Page objects are under : sdetProject/page-objects/sauce-demo

    c.	Data file: sdetProject/sauce-demo/data.json