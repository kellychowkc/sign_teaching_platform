
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

const queryStr = window.location.search;
const packageId = new URLSearchParams(queryStr).get("id");


paypal.Buttons({
    createOrder: async function (data, actions) {
        const resp = await fetch(`/userInfo/toPayPal?id=${packageId}`, { method: "POST" });
        const result = await resp.json();
        if (result.success === false) {
            Swal.fire({
                icon: 'error',
                title: "失敗",
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                window.location.href = "./userInfo.html";
            })
        } else {
            const price = result.message["price"];
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price
                    }
                }]
            });
        }
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then( async () => {
            const resp = await fetch(`/userInfo/insertNewOrder?id=${packageId}`, { method: "POST" });
            const result = await resp.json();
            if (result.success === true) {
                Swal.fire({
                    icon: 'success',
                    title: "成功",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    window.location.href = "./userInfo.html";
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "失敗",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    window.location.href = "./userInfo.html";
                })
            }
        });
    }
}).render('#paypal');
