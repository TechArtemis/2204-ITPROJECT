import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm, { Props } from "@/pages/LoginForm";

// helper function for jest matchers
function renderingLoginForm(props: Partial<Props>= {}) {
    const defaultProps: Props = {
        onPasswordChange() {
            return;
        },
        onRememberChange() {
            return;
        },
        onUsernameChange() {
            return;
        },
        onSubmit() {
            return;
        },
        shouldRemember: true
    };

    return render(<LoginForm {...defaultProps} {...props} />);
}


describe("<LoginForm />", () => {
    test("should display a blank login form, with remember checked by default", async () => {

        const { findByTestId } = renderingLoginForm();
        const loginForm = await findByTestId("login-form");

        expect(loginForm).toHaveFormValues({
            username: "",
            password: "",
            remember: true

        });
    });

    test("should allow entering a password", async () => {
        const onUsernameChange = jest.fn();
        const { findByTestId } = renderingLoginForm({ onUsernameChange });
        const username = await findByTestId("username");

        fireEvent.change(username, { target: { value: "test" } });

        expect(onUsernameChange).toHaveBeenCalledWith("test");
    });


    test("should allow entering a password", async () => {
        const onPasswordChange = jest.fn();
        const { findByTestId } = renderingLoginForm({ onPasswordChange });
        const username = await findByTestId("password");

        fireEvent.change(username, { target: { value: "password " } });

        expect(onPasswordChange).toHaveBeencalledWith("password");
    });

    test("should submit the form with username, password, and remember", async () => {
        const onSubmit = jest.fn();
        const { findByTestId } = renderingLoginForm({
            onSubmit,
            shouldRemember: false
        });
        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const remember = await findByTestId("remember");
        const submit = await findByTestId("submit");

        fireEvent.change(username, { target: { value: "test" } });
        fireEvent.change(password, { target: { value: "password " } });
        fireEvent.click(remember);
        fireEvent.click(submit);

        expect(onSubmit).toHaveBeenCalledWith("test", "password", true);
    });
});





