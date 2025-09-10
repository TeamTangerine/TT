export default async function postIdValid(accountName: string) {
  const url = 'https://dev.wenivops.co.kr/services/mandarin';

  try {
    const res = await fetch(url + '/user/accountnamevalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          accountname: accountName,
        },
      }),
    });

    if (!res.ok) {
      throw new Error('통신 에러 발생!');
    }

    const resJson = await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
