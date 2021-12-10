import { Button, Col, Input, Row } from 'antd'
import React, { useRef } from 'react'
import { ILoginReqType } from '../../types/types';
import styles from './Signin.module.css';

interface ISigninProps {
    login: (reqData: ILoginReqType) => void;
}

const Signin: React.FC<ISigninProps> = ({login}) => {

    const emailRef = useRef<Input>(null);//target
    const passwordRef = useRef<Input>(null);

    const handleClick = () => {
        const email = emailRef.current!.state.value;
        const password = passwordRef.current!.state.value;
        console.log('email:', email, ' / password:', password)

        login({email, password})
    }

    return (
        <Row align="middle" className={styles.signin_row}>
            <Col span={24}>
                <Row className={styles.signin_contents}>
                    <Col span={12}>
                        <img src="/bg_signin.png" className={styles.signin_bg} alt="Signin"/>
                    </Col>
                    <Col span={12}>
                        <div className={styles.signin_title}>My Books</div>
                        <div className={styles.signin_subtitle}>Please Note Your Opinion</div>
                        <div className={styles.signin_underline} />
                        <div className={styles.email_title}>Email
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input className={styles.input} ref={emailRef}
                            placeholder="Email"
                            autoComplete="email"
                            name="email"/>
                        </div>

                        <div className={styles.password_title}>Password
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input className={styles.input} ref={passwordRef}
                            type="password"
                            autoComplete="current-password"
                            name="password"/>
                        </div>

                        <div className={styles.button_area}>
                            <Button onClick={handleClick}
                            className={styles.button} size="large">Sign In</Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default Signin;