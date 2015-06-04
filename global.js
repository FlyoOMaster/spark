module.exports = {
    generateSalt:function(){
      var salt = "",
          min = 33,
          max = 126;
      for (var i = 0; i < 64; i++) {
          salt += String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return salt;
    }
};
