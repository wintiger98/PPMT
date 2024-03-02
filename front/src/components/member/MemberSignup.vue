<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <form class="mx-1 mx-md-4">

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input v-model="email" type="email" id="form3Example3c"
                                                    class="form-control" />
                                                <label class="form-label" for="form3Example3c">Your Email</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input v-model="password" type="password" id="form3Example4c"
                                                    class="form-control" />
                                                <label class="form-label" for="form3Example4c">Password</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <input v-model="repeatPassword" type="password" id="form3Example4cd"
                                                    class="form-control" />
                                                <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                            </div>
                                        </div>

                                        <div class="form-check d-flex justify-content-center mb-5">
                                            <input class="form-check-input me-2" type="checkbox" value=""
                                                id="form2Example3c" />
                                            <label class="form-check-label" for="form2Example3">
                                                I agree all statements in <a href="#!">Terms of service</a>
                                            </label>
                                        </div>

                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button @click="signupSubmit" type="button"
                                                class="btn btn-primary btn-lg">Register</button>
                                        </div>

                                    </form>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "MemberSignup",
    data() {
        return {
            email: '',
            password: '',
            repeatPassword: '',
        };
    },
    methods: {
        async signupSubmit() {
            if (!this.email || !this.password) {
                alert("ID와 비밀번호를 입력하세요.");
                return;
            }

            if (this.password !== this.repeatPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            try {
                const saveData = {
                    email: this.email,
                    password: this.password,
                };
                const response = await this.$axios.post(`${this.$store.state.host}/auth/signup`, saveData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    // 회원가입 성공시 처리
                    alert("회원가입이 완료되었습니다.");
                    this.$router.push("/"); // 원하는 경로로 리다이렉트
                } else {
                    // 회원가입 실패시 처리
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                console.error(error);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        },
    },
}
</script>

<style></style>