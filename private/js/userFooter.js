export function userFooter() {
  document.querySelector("#footer").innerHTML = `
    <div class="row container mx-auto pt-5">
        <div class="footer-one col-lg-4 col-md-6 col-12 mb-3">
            <img src="/assets/手語學堂logo.png" alt="logo" width="100" height="90">
            <p>中心開辦手語培訓課程，以鼓勵健聽人士學習手語，並掌握基本的對話技巧及相關的文化知識，使他們能夠與聽障人士溝通，以建立共融社會。</p>
        </div>
        <div class="footer-one col-lg-4 col-md-6 col-12 mb-3">
            <h5 class="pb-2">關於我們</h5>   
            <ul class="text-uppercase list-unstyled">
                <li><a href="#"></a>免責聲明</li>
                <li><a href="#"></a>私隱聲明</li>
                <li><a href="#"></a>退款政策</li>
                <li><a href="#"></a>網頁指南</li>
            </ul>
        </div>
        <div class="footer-one col-lg-4 col-md-6 col-12 mb-3">
            <h5 class="pb-2">聯絡我們</h5>   
            <div>
                <h6 class="text-uppercase">電話</h6>
                <p>(852) 1234-5678</p>
            </div>
            <div>
                <h6 class="text-uppercase">電郵</h6>
                <p>contact_info@signAcademy.com</p>
            </div>
            <div>
                <h6 class="text-uppercase">辦公室地址</h6>
                <p>新界荃灣福來邨永樂樓地下
                    7-10號(荃灣港鐵站A3出口)</p>
            </div>
        </div>
    </div>
    <div class="copyright mt-5">
        <div class="row container mx-auto">
            <div class="col-lg-4 col-md-6 col-12 text-nowrap mb-2">
                <p> © 2022 手語學堂 版權所有 不得轉載 </p>
            </div>
        </div>
    </div>
    `;
}
