const axios = require('axios');

exports.get_login = async (req, res) => {
    try {
        if (Number(process.env.DEV) == 1) {
            console.log(
                req.f.jwt.sign(
                    {
                        hash: '23j4g3g452g54',
                        hash_login: '123',
                    },
                    req.setting.jwt_private,
                    req.setting.session_duration,
                )
            )
        }

        const response = await axios.post(
            `${req.setting.single_id_endpoint}/get_login`,
            {
                api_key: req.setting.single_id_api_key,
            },
            { timeout: 5000 },
        );
        
        if (response.data.status != 'success') return res.json(req.f.json.fail(400, 'single_id connection failed'));

        return res.json(
            req.f.json.success({
                login_token: response.data.data.login_token,
                redirect_url: response.data.data.login_url,
            }),
        );
    } catch (error) {
        // console.log(error);
        // res.f.syslog.messageError(`Cannot connect to MISTI Single Identity System${JSON.stringify(error)}`);
        return res.json(req.f.json.fail(400,  "Cannot connect to single_id"));
    }
}