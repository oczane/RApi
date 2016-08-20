module.exports.IsValidJson = function (inputJson) {
  try{
      JSON.parse(text);
      return true;
  }
  catch (error){
      return false;
  }
}
