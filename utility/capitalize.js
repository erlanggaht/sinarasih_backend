export default async  function capitalize (string) {
    const str = await string[0].toUpperCase() + string.slice(1)
    console.log(str)

    return str
}