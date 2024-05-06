"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let userIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OderIdAutoIncrement = 100;
let CurrentUserId;
let CurrentUserName;
let Currentuseremail;
let CurrentMedicineId;
let RequiredCount;
let Currentuser;
let EditingId;
let NewMedicineCount;
let NewExpiryDate;
let NewUserNameStatus = false;
let NewUserAgeStatus = false;
let NewUserPhoneNumberStatus = false;
let NewUserEmailIdStatus = false;
let tableBody1 = document.querySelector("#dataTable1 tbody");
let tableBody2 = document.querySelector("#dataTable2 tbody");
let tableBody3 = document.querySelector("#dataTable3 tbody");
let tableBody4 = document.querySelector("#dataTable4 tbody");
let tableBody5 = document.querySelector("#dataTable5 tbody");
let tableBody6 = document.querySelector("#dataTable6 tbody");
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5157/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let noExistingUserIdChecker = false;
            let existingUseremail = document.getElementById('existingUseremail').value;
            const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const userList = yield fetchUser();
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
        }
        catch (error) {
            console.error('Error fecting User:', error);
        }
    });
}
function medicinePage() {
    let CurrentUserPage = document.getElementById('signInPage');
    let mainPage = document.getElementById('mainPage');
    let greet = document.getElementById('greet');
    CurrentUserPage.style.display = "none";
    mainPage.style.display = "block";
    greet.innerHTML = `<h3>Hello${CurrentUserName}</h3>`;
}
function signInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        let homePage = document.getElementById('homePage');
        let CurrentUserPage = document.getElementById('signInPage');
        let availableUser = document.getElementById('availableUser');
        const userList = yield fetchUser();
        homePage.style.display = "none";
        CurrentUserPage.style.display = "block";
        availableUser.innerHTML = "<h2>Available User</h2>";
        for (let i = 0; i < userList.length; i++) {
            availableUser.innerHTML += `User Name : ${userList[i].userName} | User Id : ${userList[i].userID}<br>`;
        }
    });
}
function signUpPage() {
    let homePage = document.getElementById('homePage');
    let newUserPage = document.getElementById('signUpPage');
    homePage.style.display = "none";
    newUserPage.style.display = "block";
}
function checkNewUserPhoneNumber(paramNewUserPhoneNumber) {
    let newUserPhoneNumber = document.getElementById(paramNewUserPhoneNumber).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message");
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
function checkNewUserAge(paramNewUserAge) {
    let newUserAge = document.getElementById(paramNewUserAge).value;
    let newUserAgeMessage = document.getElementById(paramNewUserAge + "Message");
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
function checkNewUserName(paramNewUserName) {
    let newUserName = document.getElementById(paramNewUserName).value;
    let newUserNameMessage = document.getElementById(paramNewUserName + "Message");
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
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5157/api/Medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function medicineList() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList = document.getElementById('medicineList');
        let mainPage = document.getElementById('mainPage');
        const medicineArray = yield fetchMedicine();
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
        }
        ;
    });
}
function medicineList1() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList1 = document.getElementById('medicineList1');
        let mainPage = document.getElementById('mainPage');
        const medicineArray = yield fetchMedicine();
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
        }
        ;
    });
}
function displayHomePage() {
    let homePage = document.getElementById('homePage');
    let mainPage = document.getElementById('mainPage');
    let CurrentUserPage = document.getElementById('signInPage');
    let medicineList = document.getElementById('medicineList');
    let historyDisplay = document.getElementById('historyDisplay');
    let medicinePage = document.getElementById('medicinePage');
    CurrentUserPage.style.display = "none";
    medicineList.style.display = "none";
    mainPage.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    homePage.style.display = "block";
}
function mainPage() {
    let mainPage = document.getElementById('mainPage');
    let homePage = document.getElementById('homePage');
    let CurrentUserPage = document.getElementById('signInPage');
    let medicineList = document.getElementById('medicineList');
    let historyDisplay = document.getElementById('historyDisplay');
    let medicinePage = document.getElementById('medicinePage');
    let CancelOderPage = document.getElementById('CancelOderPage');
    let Displayamount = document.getElementById('rechargePage');
    let medicineList1 = document.getElementById('medicineList1');
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
    let historyDisplay = document.getElementById('historyDisplay');
    let mainPage = document.getElementById('mainPage');
    mainPage.style.display = "none";
    historyDisplay.style.display = "block";
    showHistory();
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5157/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Order');
        }
        return yield response.json();
    });
}
function showHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let historyDisplay = document.getElementById('historyDisplay');
        let orderCount = 0;
        const orderList = yield fetchOrder();
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
    });
}
function purchaseMedince() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicinePage = document.getElementById('medicinePage');
        let mainPage = document.getElementById('mainPage');
        let medicineList1 = document.getElementById('medicineList1');
        const medicineArray = yield fetchMedicine();
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
        }
        ;
        medicinePage.style.display = "block";
    });
}
function buyMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        let proceed = true;
        let finalMedicineRequiredCount = 0;
        const medicine = CurrentMedicineId;
        const medicineInfo = document.getElementById("medicineInfo");
        let medicineRequiredCount = document.getElementById('medicineRequiredCount').value;
        let medicineRequiredCountRegex = /^\d{1,3}$/;
        const medicineArray = yield fetchMedicine();
        const orderList = yield fetchOrder();
        if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
            let today = new Date(Date.parse(Date()));
            for (let i = 0; i < medicineArray.length; i++) {
                if (medicineArray[i].medicineID === medicine) {
                    const medicineName = medicineArray[i].medicineName;
                    let count = Number(medicineRequiredCount);
                    if (Currentuser.balance > (medicineArray[i].medicinePrice * Number(medicineRequiredCount))) {
                        if (today.toDateString() > medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")) {
                            if (medicineArray[i].medicineName == medicineName) {
                                if (medicineArray[i].medicineCount > 0) {
                                    if ((medicineArray[i].medicineCount - +medicineRequiredCount) < 0) {
                                        proceed = confirm(`We only have ${medicineArray[i].medicineCount} ${medicineArray[i].medicineName}. Do you want to buy ${medicineArray[i].medicineCount} ${medicineArray[i].medicineName}?`);
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
                                        var order = {
                                            orderID: 100,
                                            userID: CurrentUserId,
                                            medicineID: medicineArray[i].medicineID,
                                            medicineName: medicineArray[i].medicineName,
                                            medicineCount: finalMedicineRequiredCount,
                                            medicineExpiryDate: medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/"),
                                            totalAmount: medicineArray[i].medicinePrice * finalMedicineRequiredCount,
                                            oderStatus: "Odered"
                                        };
                                        addOrder(order);
                                        const row = document.createElement("tr");
                                        row.innerHTML = `
                                        <td>${medicineArray[i].medicineName}</td>
                                        <td>${finalMedicineRequiredCount}</td>
                                        <td>${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")}</td>
                                        <td>${medicineArray[i].medicinePrice * finalMedicineRequiredCount}</td>
                                        `;
                                        tableBody3.appendChild(row);
                                    }
                                    ;
                                    purchaseMedince();
                                    document.getElementById('medicineRequiredCount').value = "";
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
    });
}
function buy() {
    return __awaiter(this, void 0, void 0, function* () {
        const medicineArray = yield fetchMedicine();
        tableBody3.innerHTML = "";
        document.getElementById('medicineInfo').innerText = "";
        alert("order placed succefully");
    });
}
function add(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const medicine = id;
        const medicineInfo = document.getElementById("medicineInfo");
        const medicineArray = yield fetchMedicine();
        for (let i = 0; i < medicineArray.length; i++) {
            if (medicineArray[i].medicineID === medicine) {
                medicineInfo.innerHTML = `Medicine Id : ${medicineArray[i].medicineID} --- Medicine Name : ${medicineArray[i].medicineName} --- Medicine Count : ${medicineArray[i].medicineCount} --- Medicine Expiry Date : ${medicineArray[i].medicineExpriyDate.split("T")[0].split("-").reverse().join("/")} --- Medicine Price : ${medicineArray[i].medicinePrice} `;
                CurrentMedicineId = id;
            }
        }
    });
}
function displayRequiredCount() {
    let medicineInfo = document.getElementById('medicineInfo');
    let requiredCount = document.getElementById('requiredCount');
    medicineInfo.style.display = "block";
    requiredCount.style.display = "block";
}
function CancelOderPage() {
    let CancelOderPage = document.getElementById('CancelOderPage');
    let mainPage = document.getElementById('mainPage');
    mainPage.style.display = "none";
    CancelOderPage.style.display = "block";
    cancelOder();
}
function cancelOder() {
    return __awaiter(this, void 0, void 0, function* () {
        let historyDisplay = document.getElementById('historyDisplay');
        let orderCount = 0;
        const orderList = yield fetchOrder();
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
    });
}
function Cancel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const newid = id;
        const orderList = yield fetchOrder();
        const medicineArray = yield fetchMedicine();
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
    });
}
function LogOut() {
    let homePage = document.getElementById('homePage');
    let mainPage = document.getElementById('mainPage');
    let CurrentUserPage = document.getElementById('signInPage');
    let medicineList = document.getElementById('medicineList');
    let historyDisplay = document.getElementById('historyDisplay');
    let medicinePage = document.getElementById('medicinePage');
    CurrentUserPage.style.display = "none";
    medicineList.style.display = "none";
    mainPage.style.display = "none";
    historyDisplay.style.display = "none";
    medicinePage.style.display = "none";
    homePage.style.display = "block";
    alert("LoggedOut");
}
function rechargePage() {
    let Displayamount = document.getElementById('rechargePage');
    let mainPage = document.getElementById('mainPage');
    mainPage.style.display = "none";
    Displayamount.style.display = "block";
}
function Recharge() {
    let addAmount = parseInt(document.getElementById('addAmount').value);
    if (addAmount > 0) {
        Currentuser.balance += addAmount;
        alert("Your balance is " + Currentuser.balance);
        document.getElementById('addAmount').value = "";
    }
    else {
        alert("please enter the valid amount");
        document.getElementById('addAmount').value = "";
    }
}
function ShowBalance() {
    alert("Your Current Balance is " + Currentuser.balance);
}
function EditMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const newid = id;
        EditingId = id;
        const medicineArray = yield fetchMedicine();
        const item = medicineArray.find((item) => item.medicineID === id);
        if (item) {
            document.getElementById("quantity").value = String(item.medicineCount);
            document.getElementById("expiryDate").value = item.medicineExpriyDate.split("T")[0].split("-").reverse().join("/");
        }
    });
}
function SubmitEdit() {
    return __awaiter(this, void 0, void 0, function* () {
        const medicineArray = yield fetchMedicine();
        for (let i = 0; i < medicineArray.length; i++) {
            if (medicineArray[i].medicineID === EditingId) {
                medicineArray[i].medicineCount = NewMedicineCount;
                medicineArray[i].medicineExpriyDate = NewExpiryDate;
                break;
            }
        }
    });
}
function DeletMedicine(item1) {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineArray = yield fetchMedicine();
        medicineArray = medicineArray.filter((item) => item.medicineID !== item1);
        medicineList();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5157/api/User', {
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
    });
}
function addmedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5157/api/Medicine', {
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
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5157/api/Order', {
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
    });
}
function updateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5157/api/Order/${id}`, {
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
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5157/api/Medicine/${id}`, {
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
    });
}
function deleteMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5157/api/Medicine/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete MedicineList');
        }
        medicineList();
        medicineList1();
    });
}
function deleteOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5157/api/Order/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete Order');
        }
        showHistory();
        historyDisplay();
    });
}
//# sourceMappingURL=script.js.map