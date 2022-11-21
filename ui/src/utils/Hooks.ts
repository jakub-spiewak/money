export const useChunkedArray = <T>(arr: T[], chunksAmount: number): T[][] => {
    const chunkSize = Math.round(arr.length / chunksAmount)

    if (chunkSize === 0 || arr.length === 0) return []

    const chunks: T[][] = []

    for (let i = 0; i < chunksAmount; i++) {
        chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize))
    }

    const offset = arr.length % chunksAmount

    for (let i = 0; i < offset; i++) {
        // TODO: wtf with that "+ 2"
        chunks[i].push(arr[i + offset + 2])
    }

    return chunks;
}