<template>
    <div class="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-indigo-600
    to-blue-400
    ">
        <div class="px-40 py-20 bg-white rounded-md shadow-xl">
            <div class="flex flex-col items-center">
                <h1 class="font-bold text-blue-600 text-9xl text-center">404
                    <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span class="text-red-500 ">Oops!</span>
                        Page not Found
                    </h6>
                    <p class="mb-8 text-center text-gray-500 md:text-lg">
                        The page you're looking for doesn't exist.
                    </p>
                    <router-link to="/" class="px-6 py-2 text-sm font-bold text-blue-800 bg-blue-100 ">
                        Go home
                    </router-link>
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorView",

}
</script>

