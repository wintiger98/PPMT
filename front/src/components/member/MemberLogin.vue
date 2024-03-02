<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="loginSubmit">
                        <!-- email input -->
                        <div class="form-outline mb-4">
                            <input v-model="email" type="id" id="form3Example3" class="form-control form-control-lg"
                                placeholder="Enter an email address" />
                            <label class="form-label" for="form3Example3">Email Address </label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <input v-model="password" type="password" id="form3Example4"
                                class="form-control form-control-lg" placeholder="Enter password" />
                            <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button @click="loginSubmit" type="button" class="btn btn-primary btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <router-link to="/signup" class="link-danger">Register</router-link>
                            </p>

                        </div>

                    </form>
                </div>
            </div>
        </div>
        <div
            class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <!-- Copyright -->
            <div class="text-white mb-3 mb-md-0">
                Copyright © 2020. All rights reserved.
            </div>
            <!-- Copyright -->
        </div>
    </section>
</template>
  
<script>
export default {
    name: "MemberLogin",
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async loginSubmit() {
            if (!this.email || !this.password) {
                alert("ID와 비밀번호를 입력하세요.");
                return;
            }

            try {
                const formData = new FormData();
                formData.append('username', this.email);
                formData.append('password', this.password);

                const response = await this.$axios.post(
                    `${this.$store.state.host}/auth/token`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.status === 200) {
                    // 로그인 성공시 처리
                    const returnData = response.data;
                    const payload = {
                        email: this.email,
                        accessToken: returnData.access_token,
                    }
                    this.$store.dispatch("login", payload); // 로그인 액션 호출
                    this.$router.push("/"); // 원하는 경로로 리다이렉트
                } else {
                    // 로그인 실패시 처리
                    alert("로그인에 실패했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                console.error(error);
                alert("로그인 중 오류가 발생했습니다.");
            }
        },
    },
};
</script>
<style>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}
</style>