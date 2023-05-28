<template>
  <NavBar />
  <Loading />
  <ParticlesBg type="cobweb" bg="{true}" :config="bgConfig" color="#ed1b24" />
  <section class="loginForm vh-100">
    <section class="register dropShadow" v-if="!hasSeenCongrats">
      <h2 class="register-title">Student's Form</h2>

      <div class="register-stepper">
        <div class="step" :class="{ 'step-active': step === 1, 'step-done': step > 1 }">
          <span class="step-number">1</span>
        </div>
        <div class="step" :class="{ 'step-active': step === 2, 'step-done': step > 2 }">
          <span class="step-number">2</span>
        </div>
        <div class="step" :class="{ 'step-active': step === 3, 'step-done': step > 3 }">
          <span class="step-number">3</span>
        </div>
        <div class="step" :class="{ 'step-active': step === 4, 'step-done': step > 4 }">
          <span class="step-number">4</span>
        </div>
        <div class="step" :class="{ 'step-active': step === 5, 'step-done': step > 5 }">
          <span class="step-number">5</span>
        </div>
      </div>

      <transition name="slide-fade">
        <section v-show="step === 1">
          <form class="form" method="post" action="#" @submit.prevent="passportCheck">
            <div class="form-group">
              <small class="red-quired">*</small>
              <input
                class="form-control"
                type="text"
                v-model="students.passport"
                autocomplete="students.passport"
                placeholder="Passport"
                required
              />
            </div>
            <div
              class="cta"
              data-style="see-through"
              data-alignment="right"
              data-text-color="custom"
            >
              <input type="submit" value="Next" class="link_text btn btn-primary" />
            </div>
          </form>
        </section>
      </transition>
      <transition name="slide-fade">
        <section v-show="step === 2">
          <form class="form" method="post" action="#" @submit.prevent="next">
            <div class="form-group">
              <select
                id="add_region"
                @change="getCity()"
                class="form-select"
                placeholder="Select Region ..."
                aria-label="regions"
                aria-describedby="SelectRegionLabel"
              >
                <option selected value="">Select Region</option>
                <option v-for="region in regions" :key="region.id" :value="region.id">
                  {{ region.region }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <select
                id="add_city"
                @change="getUniversity()"
                class="form-select"
                placeholder="Select City ..."
                aria-label="cities"
                aria-describedby="SelectCityLabel"
              >
                <option selected value="">Select City</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.city }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <select
                id="add_university"
                v-model="students.university_id"
                class="form-select"
                placeholder="Select University ..."
                aria-label="universities"
                aria-describedby="SelectUniversityLabel"
                required
              >
                <option selected value="">Select University</option>
                <option
                  v-for="university in universities"
                  :key="university.id"
                  :value="university.id"
                >
                  {{ university.university_name }}
                </option>
              </select>
            </div>
            <div class="form-group cta-step">
              <div class="cta">
                <span class="link_wrap btn btn-primary" @click.prevent="prev()"
                  >Previous</span
                >
              </div>
              <div class="cta">
                <input type="submit" value="Next" class="link_text btn btn-primary" />
              </div>
            </div>
          </form>
        </section>
      </transition>
      <transition name="slide-fade">
        <section v-show="step === 3">
          <form class="form" action="#" @submit.prevent="next">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.name"
                placeholder="Name"
                required
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="date"
                v-model="students.birthday"
                placeholder="Birthday"
                required
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.birthplace"
                placeholder="Birthplace"
                required
              />
            </div>
            <div class="form-group">
              <select
                class="form-control"
                name="sex"
                id="add_sex"
                v-model="students.sex"
                placeholder="Gender"
                required
              >
                <option selected value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.origin"
                placeholder="Origin"
                required
              />
            </div>

            <div class="form-group cta-step">
              <div class="cta">
                <span class="link_wrap btn btn-primary" @click.prevent="prev()"
                  >Previous</span
                >
              </div>
              <div class="cta">
                <input type="submit" value="Next" class="link_text btn btn-primary" />
              </div>
            </div>
          </form>
        </section>
      </transition>
      <transition name="slide-fade">
        <section v-show="step === 4">
          <form class="form" action="#" @submit.prevent="next">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.major"
                placeholder="Major"
                required
              />
            </div>
            <div class="form-group">
              <select
                class="form-control"
                name="sex"
                id="add_sex"
                v-model="students.degree"
                placeholder="Degree"
                required
              >
                <option selected value="">Select Degree</option>
                <option value="language">Chinese Language</option>
                <option value="D1">D-1</option>
                <option value="D2">D-2</option>
                <option value="D3">D-3</option>
                <option value="D4">D-4</option>
                <option value="S1">S-1</option>
                <option value="S2">S-2</option>
                <option value="S3">S-3</option>
              </select>
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="number"
                v-model="students.start_year"
                placeholder="Start Year"
                required
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="number"
                v-model="students.finish_year"
                placeholder="Finish Year"
                required
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.scholarship"
                autocomplete="students.scholarship"
                placeholder="Scholarship"
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.scholarship_type"
                autocomplete="students.scholarship_type"
                placeholder="Scholarship Type"
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.agency"
                autocomplete="students.agency"
                placeholder="Agency"
              />
            </div>

            <div class="form-group cta-step">
              <div class="cta">
                <span class="link_wrap btn btn-primary" @click.prevent="prev()"
                  >Previous</span
                >
              </div>
              <div class="cta">
                <input type="submit" value="Next" class="link_text btn btn-primary" />
              </div>
            </div>
          </form>
        </section>
      </transition>
      <transition name="slide-fade">
        <section v-show="step === 5">
          <form class="form" action="#" @submit.prevent="studentsRegister">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.wechat_id"
                autocomplete="students.wechat_id"
                placeholder="Wechat_id"
                required
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.phone"
                autocomplete="students.phone"
                placeholder="Phone"
                required
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="students.emergency_phone"
                autocomplete="students.emergency_phone"
                placeholder="Emergency Phone"
                required
              />
            </div>

            <div class="form-group">
              <input
                class="form-control"
                type="email"
                v-model="students.email"
                autocomplete="students.email"
                placeholder="Email"
                required
              />
            </div>

            <div class="form-group cta-step">
              <div class="cta">
                <span class="link_wrap btn btn-primary" @click.prevent="prev()"
                  >Previous</span
                >
              </div>
              <div class="register-btn">
                <input class="btn btn-primary" type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </section>
      </transition>
    </section>
    <section class="congrats register dropShadow" v-if="hasSeenCongrats">
      <div class="register-icon"></div>
      <h2 class="congrats-title">Thank you !</h2>
      <p class="congrats-subtitle">You have successfully Registered<br /></p>
    </section>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Loading from "../components/LoadingSpinner.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import $ from "jquery";

import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "FormView",
  components: {
    NavBar,
    ParticlesBg,
    Loading,
  },
  setup() {
    const { success, error, info, warning } = useToast();
    return { success, error, info, warning };
  },
  data() {
    return {
      regions: [],
      cities: [],
      universities: [],
      steps: {},
      step: 1,
      students: {
        passport: "",
        name: "",
        birthday: "",
        birthplace: "",
        sex: "",
        origin: "",
        major: "",
        degree: "",
        start_year: "2020",
        finish_year: "",
        wechat_id: "",
        phone: "",
        emergency_phone: "",
        email: "",
        scholarship: "",
        scholarship_type: "",
        agency: "",
        university_id: "",
      },
      hasSeenCongrats: false,
    };
  },
  mounted() {
    this.getRegion();
  },
  methods: {
    passportCheck() {
      if (
        this.students.passport.length > 11 ||
        !/^[a-zA-Z0-9]+$/.test(this.students.passport)
      ) {
        this.error("Passport is invalid");
        return false;
      }

      axios
        .post("http://localhost:8000/api/student/check", {
          passport: this.students.passport,
        })
        .then((response) => {
          if (response.status == 200) {
            this.success(response.data.message);
            this.next();
          }
        })
        .catch((error) => {
          this.error(error.response.data.message);
        });
    },
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    studentsRegister: function () {
      var formData = new FormData();
      formData.append("passport", this.students.passport);
      formData.append("name", this.students.name);
      formData.append("birthday", this.students.birthday);
      formData.append("birthplace", this.students.birthplace);
      formData.append("sex", this.students.sex);
      formData.append("origin", this.students.origin);
      formData.append("major", this.students.major);
      formData.append("degree", this.students.degree);
      formData.append("start_year", this.students.start_year);
      formData.append("finish_year", this.students.finish_year);
      formData.append("wechat_id", this.students.wechat_id);
      formData.append("phone", this.students.phone);
      formData.append("emergency_phone", this.students.emergency_phone);
      formData.append("email", this.students.email);
      formData.append("scholarship", this.students.scholarship);
      formData.append("scholarship_type", this.students.scholarship_type);
      formData.append("agency", this.students.agency);
      formData.append("university_id", this.students.university_id);

      axios
        .post("http://localhost:8000/api/student/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.success(response.data.message);
            this.hasSeenCongrats = true;
          }
        })
        .catch((error) => {
          this.error(error.response.data.message);
        });
    },
    getRegion() {
      axios
        .get("http://localhost:8000/api/public/region")
        .then((response) => {
          this.regions = response.data.regions;
          this.regions.forEach((region) => {
            region.value = region.region;
          });
          $("#Loading").hide();
        })
        .catch((error) => {
          this.error(error.response.data.message);
          $("#Loading").hide();
        });
    },
    getCity() {
      let region = $("#add_region").val();
      axios
        .get("http://localhost:8000/api/public/city/" + region)
        .then((response) => {
          this.cities = response.data.cities;
          this.cities.forEach((city) => {
            city.value = city.city;
          });
        })
        .catch((error) => {
          this.error(error.response.data.message);
        });
    },
    getUniversity() {
      let city = $("#add_city").val();
      axios
        .get("http://localhost:8000/api/public/university/" + city)
        .then((response) => {
          this.universities = response.data.universities;
          this.universities.forEach((university) => {
            university.value = university.university;
          });
        })
        .catch((error) => {
          this.error(error.response.data.message);
        });
    },
  },
};
</script>

<style>
.canvas {
  background-color: #f3f3f3;
  height: 100vh !important;
}

.red-quired {
  font-size: larger;
  font-weight: 600;
  color: red;
}

.dropShadow {
  box-shadow: 0 10px 20px #999;
}
/* VARIABLES */
/* COLORS */
/* FONT */
.pen-description {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.pen-description h1 {
  text-align: center;
  margin-top: 2rem;
  color: #fff;
}
.pen-description p {
  margin: 0;
  line-height: 1;
}
.pen-description .pen-copyright img {
  border-radius: 25px;
  padding: 5px;
  margin: 5px;
  transition: box-shadow 0.5s ease-in-out;
}
.pen-description .pen-copyright:hover img {
  box-shadow: 0 10px 20px #0e2101;
}
.register {
  display: block;
  color: #333;
  max-width: 540px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
}
.register-title {
  font-weight: 600;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  color: #333;
  padding: 0 2rem;
  margin: 2rem 2rem;
}
.register-stepper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin: 0 auto 1.5em;
}
.register-stepper::before {
  z-index: 0;
  content: "";
  display: block;
  position: absolute;
  height: 2px;
  top: calc(50% - 1px);
  background: #cecece;
  width: calc(100% - 20px);
}
.register-stepper .step {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border: 2px solid #cecece;
  background-color: #fff;
  border-radius: 50%;
  min-width: 25px;
  min-height: 25px;
  line-height: 20px;
  font-size: 16px;
}
.register-stepper .step-active {
  color: #333;
  background-color: #fff;
  border-color: #333;
}
.register-stepper .step-done {
  color: #999;
  border-color: #999999;
}
.register-stepper .step-number {
  font-weight: 800;
  line-height: 1;
  vertical-align: middle;
}
.register .form-group {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: baseline;
}
.register .form-group label {
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.1;
  padding-bottom: 0.5rem;
}
.register .form-group.cta-step {
  color: #333;
  justify-content: space-between;
}
.register .form-group.cta-step .cta.prev {
  padding: 10px 30px;
}
.register .form-group.new-password {
  margin-top: 2rem;
}
.register .form .cta-color .link_wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.register .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.register .slide-fade-leave-active {
  display: none;
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.register .slide-fade-enter,
.register .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.congrats {
  background: #fff;
  color: #333;
  padding: 4rem;
  text-align: center;
}
.congrats-subtitle {
  line-height: 1.3;
}
.congrats-subtitle strong {
  font-size: 2rem;
}
</style>
