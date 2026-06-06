export async function sendMessage(prompt) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        reply: `This is a sample response for: ${prompt}`,
      })
    }, 450)
  })
}

export async function uploadDocument(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        name: file.name,
        size: file.size,
      })
    }, 450)
  })
}
