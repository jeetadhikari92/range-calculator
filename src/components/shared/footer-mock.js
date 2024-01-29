class FooterMock extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <footer class="footer">
      <section class="footer-section">
        <h4 class="footer-section-header">CONTACT US</h4>
        <p class="footer-section-content">
          +44 345 678 903 <br> 
          adobexd@mail.com <br>
          Find a Store
        </p>
      </section>
      <section class="footer-section">
        <h4 class="footer-section-header">CUSTOMER SERVICE</h4>
        <ul class="footer-section-content">
          <li><a>Contact Us</a></li>
          <li><a>Ordering & Payment</a></li>
          <li><a>Shipping</a></li>
          <li><a>Returns</a></li>
          <li><a>FAQ</a></li>
        </ul>
      </section>
      <section class="footer-section">
        <h4 class="footer-section-header">INFORMATION</h4>
        <ul class="footer-section-content">
          <li><a>About this example</a></li>
          <li><a>Work With US</a></li>
          <li><a>Privacy Policy</a></li>
          <li><a>Terms & Conditions</a></li>
          <li><a>Press Enquiries</a></li>
        </ul>
      </section>
      <section class="footer-section">
        <h4 class="footer-section-header">Subscribe to us via Email</h4>
        <p class="footer-section-content">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        </p>
        <div class="footer-section-content-actions">
          <input name="email" class="footer-section-email-input" placeholder="Email Address" aria-placeholder="Email address" />
          <button value="">SUBSCRIBE</button>
        </div>
      </section>
    </footer>
    `;
  }
}

customElements.define("footer-mock", FooterMock);
