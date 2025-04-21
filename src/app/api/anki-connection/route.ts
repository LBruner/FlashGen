export async function GET(_: Request) {
  try {
    const response = await fetch(process.env.ANKI_URL!, {
      method: "POST",
      body: JSON.stringify({
        action: "version",
        version: 6,
      }),
    });

    if (!response.ok || response.status !== 200) {
      return new Response("Internal Server Error", { status: 500 });
    }

    return new Response(JSON.stringify({}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Algo deu errado com a conexão a API do Anki: ${error}`);
  }
}
