import { mount } from "@vue/test-utils";
import Register from "../components/Register.vue";

test("form renders", () => {
    const wrapper = mount(Register);
    expect(wrapper.find("form").exists()).toBeTruthy();
    expect(wrapper.find("input[type='text']").exists()).toBeTruthy();
    expect(wrapper.find("input[type='email']").exists()).toBeTruthy();
    expect(wrapper.find("input[type='password']").exists()).toBeTruthy();
    expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
  });

test("shows error message when email or password fields are empty", async () => {
    const wrapper = mount(Register);
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    
    // Trigger the form submission
    await wrapper.find("form").trigger("submit.prevent");
    
    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Please fill in all fields.");
});