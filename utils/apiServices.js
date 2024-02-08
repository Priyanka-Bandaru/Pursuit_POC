
async function getResponse(request, uri) {
    let response;
        try {
            response = await request.get(uri);
        }
        catch (error) {
           console.log(error)
        }
      return response;
}
module.exports = {
    getResponse
};