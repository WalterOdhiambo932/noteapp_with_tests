*** Settings ***

Library  SeleniumLibrary
Library  OperatingSystem

*** Variables ***

${browser}  Edge
${driver_path}     C:\Users\WOODHIAMBO\AppData\Local\Programs\Python\Python311\Scripts
${url_uat}   http://localhost:5173/


*** Test Cases ***
setenviroment and open browswer
    Set Environment Variable  webdriver.Edge.driver  ../../Driver/chromedriver.exe
     open browser   ${url_uat}    ${browser}    options=add_argument("--ignore-certificate-errors")
     maximize browser window

login to the page with Invalid credeintials

    ${"username"}       set variable    //input[@id='username']
     ${"password_text"}   set variable   //input[@id='password']
     element should be visible  ${"username"}  ${"password_text"}
     input text     ${"username"}    testuser
     input text     ${"password_text"}  testpass1
     click element     //button[normalize-space()='Login']
     Capture Page Screenshot    failedlogin.png

     sleep  5



login to the page with valid credeintials

    ${"username"}       set variable    //input[@id='username']
     ${"password_text"}   set variable   //input[@id='password']
     element should be visible  ${"username"}  ${"password_text"}
     input text     ${"username"}    testuser
     input text     ${"password_text"}  testpass
     click element     //button[normalize-space()='Login']
     Wait Until Page Contains Element    //h2[normalize-space()='Welcome!']
     Capture Page Screenshot    validlogin.png



add new item in the note app
    ${"title"}       set variable  //input[@id='noteTitle']
    ${"content"}       set variable   //textarea[@id='noteContent']
     input text     ${"title"}    fist walter note
     input text     ${"content"}  first content
     click element     //button[normalize-space()='Add Note']
     sleep  2
     Wait Until Page Contains Element    //h4[normalize-space()='fist walter note']



add new item in the note app
    ${"title2"}       set variable  //input[@id='noteTitle']
    ${"content2"}       set variable   //textarea[@id='noteContent']
     input text     ${"title2"}    second walter note
     input text     ${"content2"}  second content
     click element     //button[normalize-space()='Add Note']
     sleep  2
     Wait Until Page Contains Element    //h4[normalize-space()='second walter note']
     Capture Page Screenshot    addnewitem.png


Edit item in the note app
    click element     //button[normalize-space()='Edit']
    sleep   5
    ${"title3"}       set variable  //input[@id='noteTitle']
    ${"content3"}       set variable   //textarea[@id='noteContent']
     input text     ${"title3"}    edited walter note
     input text     ${"content3"}  edited content
     click element      //button[normalize-space()='Update Note']
     sleep  2
     Wait Until Page Contains Element    //h4[normalize-space()='edited walter note']
      Capture Page Screenshot    edititem.png


Delete item in the note app
    click element     //button[normalize-space()='Delete']
    sleep   5
     Capture Page Screenshot    deleteitem.png