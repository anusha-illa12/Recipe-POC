<template>
  <footer>
    <div class="container">
      <div class="copyright-block">
        <ul class="privacy-links">
          <li>© {{year}} Recipe app. All Rights Reserved.</li>
        </ul>
        <ul class="social-links">
          <li>
            <a href="javascript:;">
              <span class="fa fa-facebook"></span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span class="fa fa-twitter"></span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span class="fa fa-linkedin"></span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
            <span class="fa fa-instagram">
            </span>
            </a>
          </li>
        </ul>
    </div>
    </div>
    
  </footer>
</template>

<script>
export default {

  data() {
    return {
      year : new Date().getFullYear()
    }
  }

}
</script>

<style scoped>
.copyright-block {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    padding-top: 40px;
    margin-bottom: 85px;
    border-top: 1px solid rgba(53,49,49,.2);
    margin-top: 61px;
}

.copyright-block ul {
    display: inline-flex;
    list-style: none;
    padding: 0px;
    margin: 0;
}

.copyright-block ul li {
  padding: 20px;
}

.copyright-block ul li,span{
  color: #04AA6D;
}

</style>