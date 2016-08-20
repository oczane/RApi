module.exports.IsValidJson = function (inputJson) {
  try{
      JSON.parse(inputJson);
      return true;
  }
  catch (error){
      return false;
  }
}
