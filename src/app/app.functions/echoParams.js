exports.main = async (context, callback) => {
    callback({
        statusCode: 200,
        body: { message: JSON.stringify(context.params) }
    })
}