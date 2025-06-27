import Web3 from 'web3';
import request, { getAuthTokenTTL, setAuthToken, setLocalStorage } from "../service";
import jwtDecode from "jwt-decode";

export async function login(myWallet: string, web3: Web3) {
    try {
        const {message} = await request<any>({ url: `auth/${myWallet}` })

        const jwtTTL = getAuthTokenTTL();
        const isTokenExpired = parseInt(`${jwtTTL}`) < Date.now();
        if (web3 && isTokenExpired || !localStorage.getItem('jwt') || myWallet!=localStorage.getItem('address')) {
            const signature = await web3.eth.personal.sign(
                web3?.utils.utf8ToHex(
                    `By signing this transaction, I confirm that I have read and fully accept the agreement and the project policy and understand all possible risks described in the disclaimer at https://minebarons.io/dis.txt ${message}`
                ),
                myWallet,
                message
            );
            // console.log(message, signature);
            const res = await request<any>({
                url: `auth/${message.trim()}/${signature.trim()}`
            })
            // console.log(res);
            setAuthToken(res.token.token);
            setLocalStorage('jwt', res.token.token)
            setLocalStorage('address', myWallet)
            const decodedData = jwtDecode<{ exp: number }>(res.token.token)

            setLocalStorage("jwtTTL", (decodedData.exp * 1000).toString());
            return res.token.token;
        }
        // else return localStorage.
    } catch (error) {
        console.error(error)
    }
}
