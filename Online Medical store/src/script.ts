let userIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OderIdAutoIncrement = 100;

let CurrentUserId: Number;
let CurrentUserName: string;
let Currentuseremail: string;
let CurrentMedicineId: Number;
let RequiredCount: Number;
let Currentuser: any;
let EditingId: any;
let NewMedicineCount: any;
let NewExpiryDate: any;


let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
let NewUserEmailIdStatus = false;

let tableBody1 = document.querySelector("#dataTable1 tbody") as HTMLTableSectionElement;
let tableBody2 = document.querySelector("#dataTable2 tbody") as HTMLTableSectionElement;
let tableBody3 = document.querySelector("#dataTable3 tbody") as HTMLTableSectionElement;
let tableBody4 = document.querySelector("#dataTable4 tbody") as HTMLTableSectionElement;
let tableBody5 = document.querySelector("#dataTable5 tbody") as HTMLTableSectionElement;
let tableBody6 = document.querySelector("#dataTable6 tbody") as HTMLTableSectionElement;

interface User {
    userID: Number;
    userName: string;
    userAge: number;
    userPhoneNumber: string;
    userEmailId: string;
    balance: number;
}
interface MedicineInfo {

    medicineID: Number;
    medicineName: string;
    medicineCount: number;
    medicineExpriyDate: string;
    medicinePrice: number;

}

interface Order {
    orderID: Number;
    userID: Number;
    medicineID: Number;
    medicineName: string;
    medicineCount: number;
    medicineExpiryDate: string;
    totalAmount: number;
    oderStatus: string;

}


// Fecthing Datas
async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5157/api/User';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function signIn() {
    try {
        let noExistingUserIdChecker: boolean = false;
        let existingUseremail = (document.getElementById('existingUseremail') as HTMLInputElement).value;
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const userList = await fetchUser();



        for (let i = 0; i < userList.length; i++) {
            if (expression.test(existingUseremail)) {

                CurrentUserId = userList[i].userID;
                CurrentUserName = userList[i].userName;
                Currentuseremail = userList[i].userEmailId;
                Currentuser = userList[i];
                medicinePage();
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }

        if (noExistingUserIdChecker) {
            alert("Enter Valid User Id");
        }

        else {
            alert("Enter Valid User Id.");
        }
    } catch (error) {
        console.error('Error fecting User:', error);
    }
}
function medicinePage() {

    let CurrentUserPage = document.getElementById('signInPage') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLLabelElement;

    CurrentUserPage.style.display = "none";
    mainPage.style.display = "block";

    greet.innerHTML = `<h3>Hello${CurrentUserName}</h3>`;

}
async function signInPage() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let CurrentUserPage = document.getElementById('signInPage') as HTMLDivElement;
    let availableUser = document.getElementById('availableUser') as HTMLLabelElement;
    const userList = await fetchUser();

    homePage.style.display = "none";
    CurrentUserPage.style.display = "block";

    availableUser.innerHTML = "<h2>Available User</h2>";


    for (let i = 0; i < userList.length; i++) {

        availableUser.innerHTML += `User Name : ${userList[i].userName} | User Id : ${userList[i].userID}<br>`;
    }

}
function signUpPage() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let newUserPage = document.getElementById('signUpPage') as HTMLDivElement;

    homePage.style.display = "none";
    newUserPage.style.display = "block";
}
function checkNewUserPhoneNumber(paramNewUserPhoneNumber: string) {
    let newUserPhoneNumber = (document.getElementById(paramNewUserPhoneNumber) as HTMLInputElement).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message") as HTMLLabelElement;
    let newUserPhoneNumberRegex = /^\d{10}$/;

    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {

        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "tomato";
        newUserPhoneNumberMessage.style.marginLeft = "10px";
    }

}
function checkNewUserAge(paramNewUserAge: string) {
    let newUserAge = (document.getElementById(paramNewUserAge) as HTMLInputElement).value;
    let newUserAgeMessage = document.getElementById(paramNewUserAge + "Message") as HTMLLabelElement;
    let newUserAgeRegex = /^\d{1,2}$/;

    if (newUserAgeRegex.test(newUserAge)) {

        NewUserAgeStatus = true;
        newUserAgeMessage.style.visibility = "hidden";
    }
    else {
        NewUserAgeStatus = false;
        newUserAgeMessage.innerHTML = "Please enter valid age";
        newUserAgeMessage.style.visibility = "visible";
        newUserAgeMessage.style.color = "tomato";
        newUserAgeMessage.style.marginLeft = "10px";
    }

}
function checkNewUserName(paramNewUserName: string) {
    let newUserName = (document.getElementById(paramNewUserName) as HTMLInputElement).value;
    let newUserNameMessage = document.getElementById(paramNewUserName + "Message") as HTMLLabelElement;
    let newUserNameRegex = /^[a-zA-Z]{3,20}$/;

    if (newUserNameRegex.test(newUserName)) {

        NewUserNameStatus = true;
        newUserNameMessage.style.visibility = "hidden";
    }
    else {
        NewUserNameStatus = false;
        newUserNameMessage.innerHTML = "Please enter valid name";
        newUserNameMessage.style.visibility = "visible";
        newUserNameMessage.style.color = "tomato";
        newUserNameMessage.style.marginLeft = "10px";
    }

}
// Fecthing Datas
async function fetchMedicine(): Promise<MedicineInfo[]> {
    const apiUrl = 'http://localhost:5157/api/Medicine';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}
async function medicineList() {
    let medicineList = document.getElementById('medicineList') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    const medicineArray = await fetchMedicine();

    mainPage.style.display = "none";
    medicineList.style.display = "block";


    tableBody1.innerHTML = "";
    for (let i = 0; i < medicineArray.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${medicineArray[i].medicineName}</td>
        <td>${medicineArray[i].medicineCount}</td>
        <td>${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")}</td>
        <td>${medicineArray[i].medicinePrice}</td>
        <td>
        <button type="button" onclick="EditMedicine('${medicineArray[i].medicineID}')">EDIT</button>
        <button  type="button" onclick="DeletMedicine('${medicineArray[i].medicineID}')">Delete</button>
        
        </td>
      `;
        tableBody1.appendChild(row);
    };
}
async function medicineList1() {
    let medicineList1 = document.getElementById('medicineList1') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    const medicineArray = await fetchMedicine();

    mainPage.style.display = "none";
    medicineList1.style.display = "block";


    tableBody6.innerHTML = "";
    for (let i = 0; i < medicineArray.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${medicineArray[i].medicineName}</td>
        <td>${medicineArray[i].medicineCount}</td>
        <td>${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")}</td>
        <td>${medicineArray[i].medicinePrice}</td>
        <td>
        <button  onclick="('${medicineArray[i].medicineID}')">ADD</button>
        </td>
      `;
        tableBody6.appendChild(row);
    };
}

function displayHomePage() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    let CurrentUserPage = document.getElementById('signInPage') as HTMLDivElement;
    let medicineList = document.getElementById('medicineList') as HTMLDivElement;
    let historyDisplay = document.getElementById('historyDisplay') as HTMLDivElement;
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;


    CurrentUserPage.style.display = "none";
    medicineList.style.display = "none";
    mainPage.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    homePage.style.display = "block";
}
function mainPage() {
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let CurrentUserPage = document.getElementById('signInPage') as HTMLDivElement;
    let medicineList = document.getElementById('medicineList') as HTMLDivElement;
    let historyDisplay = document.getElementById('historyDisplay') as HTMLDivElement;
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    let CancelOderPage = document.getElementById('CancelOderPage') as HTMLDivElement;
    let Displayamount = document.getElementById('rechargePage') as HTMLDivElement;
    let medicineList1 = document.getElementById('medicineList1') as HTMLDivElement;

    homePage.style.display = "none";
    CurrentUserPage.style.display = "none";
    medicineList.style.display = "none";
    medicineList1.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    CancelOderPage.style.display = "none";
    mainPage.style.display = "block";
    Displayamount.style.display = "none";
    historyDisplay.innerHTML = "";

}
function historyDisplay() {
    let historyDisplay = document.getElementById('historyDisplay') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;

    mainPage.style.display = "none";
    historyDisplay.style.display = "block";

    showHistory();
}

// Fecthing Datas
async function fetchOrder(): Promise<Order[]> {
    const apiUrl = 'http://localhost:5157/api/Order';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Order');
    }
    return await response.json();
}

async function showHistory() {
    let historyDisplay = document.getElementById('historyDisplay') as HTMLDivElement;
    let orderCount: number = 0;
    const orderList = await fetchOrder();

    tableBody4.innerHTML = "";
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].userID == CurrentUserId) {

            const row = document.createElement("tr");
            row.innerHTML = `
                                        <td>${orderList[i].orderID}</td>
                                        <td>${orderList[i].userID}</td>
                                        <td>${orderList[i].medicineName}</td>
                                        <td>${orderList[i].medicineCount}</td>
                                        <td>${orderList[i].medicineExpiryDate.split("T")[0].split("-").reverse().join("/")}</td>
                                        <td>${orderList[i].totalAmount}</td>
                                        <td>${orderList[i].oderStatus}</td>
                                        `;
            tableBody4.appendChild(row);
            orderCount++;
        }
    }

    if (orderCount == 0) {

        historyDisplay.innerHTML += "Order History is empty.<br>";
    }

}
async function purchaseMedince() {
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    let medicineList1 = document.getElementById('medicineList1') as HTMLDivElement;
    const medicineArray = await fetchMedicine();



    mainPage.style.display = "none";
    medicineList1.style.display = "block";
    tableBody6.innerHTML = "";
    for (let i = 0; i < medicineArray.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${medicineArray[i].medicineName}</td>
        <td>${medicineArray[i].medicineCount}</td>
        <td>${medicineArray[i].medicinePrice}</td>
        <td>${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")}</td>
        <td>
        <button id = "${medicineArray[i].medicinePrice}" onclick="add(${medicineArray[i].medicineID})">ADD</button>
        </td>
      `;
        tableBody6.appendChild(row);
    };
    medicinePage.style.display = "block";
}
async function buyMedicine() {


    let proceed: boolean = true;
    let finalMedicineRequiredCount: number = 0;
    const medicine = CurrentMedicineId;
    const medicineInfo = document.getElementById("medicineInfo") as HTMLLabelElement;
    let medicineRequiredCount = (document.getElementById('medicineRequiredCount') as HTMLInputElement).value;
    let medicineRequiredCountRegex = /^\d{1,3}$/;
    const medicineArray = await fetchMedicine();
    const orderList = await fetchOrder();



    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        let today = new Date(Date.parse(Date()));
        for (let i = 0; i < medicineArray.length; i++) {

            if (medicineArray[i].medicineID === medicine) {
                const medicineName = medicineArray[i].medicineName;
                let count: Number = Number(medicineRequiredCount);
                if (Currentuser.balance > (medicineArray[i].medicinePrice * Number(medicineRequiredCount))) {

                    if (today.toDateString() > medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")) {

                        if (medicineArray[i].medicineName == medicineName) {


                            if (medicineArray[i].medicineCount > 0) {

                                if ((medicineArray[i].medicineCount - +medicineRequiredCount) < 0) {
                                    proceed = confirm(`We only have ${medicineArray[i].medicineCount} ${medicineArray[i].medicineName}. Do you want to buy ${medicineArray[i].medicineCount} ${medicineArray[i].medicineName}?`)

                                    if (proceed) {
                                        finalMedicineRequiredCount = medicineArray[i].medicineCount;
                                        RequiredCount = finalMedicineRequiredCount;
                                    }
                                }
                                else {
                                    finalMedicineRequiredCount = +medicineRequiredCount;
                                }

                                if (proceed) {
                                    medicineArray[i].medicineCount = medicineArray[i].medicineCount - finalMedicineRequiredCount;
                                    Currentuser.balance -= medicineArray[i].medicinePrice * finalMedicineRequiredCount;
                                    var order: Order = {
                                        orderID:100,
                                        userID: CurrentUserId,
                                        medicineID:medicineArray[i].medicineID,
                                        medicineName: medicineArray[i].medicineName,
                                        medicineCount: finalMedicineRequiredCount,
                                        medicineExpiryDate: medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/"),
                                        totalAmount: medicineArray[i].medicinePrice * finalMedicineRequiredCount,
                                        oderStatus: "Odered"
                                    }
                                    addOrder(order);
                                    const row = document.createElement("tr");
                                    row.innerHTML = `
                                        <td>${medicineArray[i].medicineName}</td>
                                        <td>${finalMedicineRequiredCount}</td>
                                        <td>${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")}</td>
                                        <td>${medicineArray[i].medicinePrice * finalMedicineRequiredCount}</td>
                                        `;

                                    tableBody3.appendChild(row);
                                };

                                purchaseMedince();
                                (document.getElementById('medicineRequiredCount') as HTMLInputElement).value = "";



                            }
                            else if (medicineArray[i].medicineCount <= 0) {
                                alert("Out of Stock, you can buy alternative medicine.");
                            }

                        }
                    }
                    else {
                        alert(today.toDateString());
                        alert(medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/"));
                        alert("Tablet Expired Please use another tablet");
                    }

                }
                else {
                    alert("Insuffecient Balance Please recharge and Try Again");
                }
            }
        }


    }
    else {
        alert("Please enter valid Required Count");
    }
}

async function buy() {
    const medicineArray = await fetchMedicine();
    tableBody3.innerHTML = "";

    (document.getElementById('medicineInfo') as HTMLLabelElement).innerText = "";
    alert("order placed succefully");
}
async function add(id: number) {
    const medicine = id;
    const medicineInfo = document.getElementById("medicineInfo") as HTMLLabelElement;
    const medicineArray = await fetchMedicine();

    for (let i = 0; i < medicineArray.length; i++) {

        if (medicineArray[i].medicineID === medicine) {
            medicineInfo.innerHTML = `Medicine Id : ${medicineArray[i].medicineID} --- Medicine Name : ${medicineArray[i].medicineName} --- Medicine Count : ${medicineArray[i].medicineCount} --- Medicine Expiry Date : ${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")} --- Medicine Price : ${medicineArray[i].medicinePrice} `;
            CurrentMedicineId = id;
        }

    }

}
function displayRequiredCount() {
    let medicineInfo = document.getElementById('medicineInfo') as HTMLLabelElement;
    let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;

    medicineInfo.style.display = "block";
    requiredCount.style.display = "block";
}

function CancelOderPage() {
    let CancelOderPage = document.getElementById('CancelOderPage') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;


    mainPage.style.display = "none";
    CancelOderPage.style.display = "block";
    cancelOder();

}
async function cancelOder() {
    let historyDisplay = document.getElementById('historyDisplay') as HTMLDivElement;
    let orderCount: number = 0;
    const orderList = await fetchOrder();

    tableBody5.innerHTML = "";
    for (let i = 0; i < orderList.length; i++) {
        if ((orderList[i].userID == CurrentUserId) && orderList[i].oderStatus == "Ordered") {
            const row = document.createElement("tr");
            row.innerHTML = `
                                        <td>${orderList[i].orderID}</td>
                                        <td>${orderList[i].medicineID}</td>
                                        <td>${orderList[i].medicineName}</td>
                                        <td>${orderList[i].medicineCount}</td>
                                        <td>${orderList[i].totalAmount}</td>
                                        <td>${orderList[i].medicineExpiryDate}</td>
                                        <td>${orderList[i].oderStatus}</td>
                                        <td>
                                        <button onclick="Cancel('${orderList[i].orderID}')">Cancel</button>
                                        </td>
                                        `;
            tableBody5.appendChild(row);
            orderCount++;
        }
    }


}
async function Cancel(id: Number) {
    const newid = id;
    const orderList = await fetchOrder();
    const medicineArray = await fetchMedicine();
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].orderID == newid) {
            let mediID = orderList[i].medicineID;
            let amount = orderList[i].totalAmount;
            let count = orderList[i].medicineCount;

            if (orderList[i].oderStatus != "Canceled") {
                Currentuser.balance += amount;
                orderList[i].oderStatus = "Canceled";
                for (let i = 0; i < medicineArray.length; i++) {
                    if (mediID == medicineArray[i].medicineID) {
                        medicineArray[i].medicineCount += count;
                        alert("Order Canceled");
                    }
                }

            }
            else {
                alert("Oder Already Canceled");
            }
            CancelOderPage();

        }
    }
}

function LogOut() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;
    let CurrentUserPage = document.getElementById('signInPage') as HTMLDivElement;
    let medicineList = document.getElementById('medicineList') as HTMLDivElement;
    let historyDisplay = document.getElementById('historyDisplay') as HTMLDivElement;
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;


    CurrentUserPage.style.display = "none";
    medicineList.style.display = "none";
    mainPage.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    homePage.style.display = "block";
    alert("LoggedOut");


}
function rechargePage() {
    let Displayamount = document.getElementById('rechargePage') as HTMLDivElement;
    let mainPage = document.getElementById('mainPage') as HTMLDivElement;

    mainPage.style.display = "none";
    Displayamount.style.display = "block";


}
function Recharge() {
    let addAmount = parseInt((document.getElementById('addAmount') as HTMLInputElement).value);
    if (addAmount > 0) {
        Currentuser.balance +=addAmount;
        alert("Your balance is " + Currentuser.balance);
        (document.getElementById('addAmount') as HTMLInputElement).value = "";

    }
    else {
        alert("please enter the valid amount");
        (document.getElementById('addAmount') as HTMLInputElement).value = "";
    }

}
function ShowBalance() {
    alert("Your Current Balance is " + Currentuser.balance);
}
async function EditMedicine(id: Number) {
    const newid = id;
    EditingId = id;
    const medicineArray = await fetchMedicine();

    const item = medicineArray.find((item) => item.medicineID === id);
    if (item) {
        (document.getElementById("quantity") as HTMLInputElement).value = String(item.medicineCount);
        (document.getElementById("expiryDate") as HTMLInputElement).value = item.medicineExpriyDate.split("T")[0].split("-").reverse().join("/");

    }
}

async function SubmitEdit() {
    const medicineArray = await fetchMedicine();

    for (let i = 0; i < medicineArray.length; i++) {
        if (medicineArray[i].medicineID === EditingId) {
            medicineArray[i].medicineCount = NewMedicineCount;
            medicineArray[i].medicineExpriyDate = NewExpiryDate;
            break;
        }


    }



}

async function DeletMedicine(item1: number) {
    let medicineArray = await fetchMedicine();
    medicineArray = medicineArray.filter((item) => item.medicineID !== item1)

    medicineList();

}


// Add Datas
async function addUser(user: User): Promise<void> {
    const response = await fetch('http://localhost:5157/api/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
    signUpPage();
}
async function addmedicine(medicine: MedicineInfo): Promise<void> {
    const response = await fetch('http://localhost:5157/api/Medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
    medicineList();
    medicineList();
    medicineList1();
}
async function addOrder(order: Order): Promise<void> {
    const response = await fetch('http://localhost:5157/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
    buyMedicine();
    medicineList();
    medicineList1();
}

// Update datas
async function updateOrder(id: string, order: Order): Promise<void> {
    const response = await fetch(`http://localhost:5157/api/Order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }
    showHistory();
    medicineList1();
}
async function updateMedicine(id: string, medicine: MedicineInfo): Promise<void> {
    const response = await fetch(`http://localhost:5157/api/Medicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error('Failed to update MedicineList');
    }
    medicineList();
    medicineList1();
}


// Deleting Datas
async function deleteMedicine(id: string): Promise<void> {
    const response = await fetch(`http://localhost:5157/api/Medicine/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete MedicineList');
    }
    medicineList();
    medicineList1();
}
async function deleteOrder(id: string): Promise<void> {
    const response = await fetch(`http://localhost:5157/api/Order/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete Order');
    }
    showHistory();
    historyDisplay();
}