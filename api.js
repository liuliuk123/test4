// API配置和工具函数
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
};

// API请求封装
class API {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.token = localStorage.getItem('user_token');
    }

    // 设置token
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('user_token', token);
        } else {
            localStorage.removeItem('user_token');
        }
    }

    // 获取token
    getToken() {
        return this.token || localStorage.getItem('user_token');
    }

    // 通用请求方法
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.getToken() && { 'Authorization': `Bearer ${this.getToken()}` })
            }
        };

        try {
            const response = await fetch(`${this.baseURL}${url}`, {
                ...defaultOptions,
                ...options,
                headers: {
                    ...defaultOptions.headers,
                    ...options.headers
                }
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    // token过期，清除并跳转登录
                    this.setToken(null);
                    if (window.location.pathname.includes('vip.html')) {
                        alert('登录已过期，请重新登录');
                        window.location.href = '登录.html';
                    }
                }
                throw new Error(data.message || '请求失败');
            }

            return data;
        } catch (error) {
            console.error('API请求错误:', error);
            throw error;
        }
    }

    // GET请求
    get(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        return this.request(fullUrl, { method: 'GET' });
    }

    // POST请求
    post(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT请求
    put(url, data) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE请求
    delete(url) {
        return this.request(url, { method: 'DELETE' });
    }

    // ========== 认证相关 ==========
    
    // 用户注册
    register(username, password, email = '', phone = '') {
        return this.post('/auth/register', { username, password, email, phone });
    }

    // 用户登录
    async login(username, password) {
        const result = await this.post('/auth/login', { username, password });
        if (result.success && result.data.token) {
            this.setToken(result.data.token);
            localStorage.setItem('user_info', JSON.stringify(result.data.user));
        }
        return result;
    }

    // 获取当前用户信息
    getCurrentUser() {
        return this.get('/auth/me');
    }

    // 登出
    logout() {
        this.setToken(null);
        localStorage.removeItem('user_info');
    }

    // ========== 商品相关 ==========
    
    // 获取商品列表
    getProducts(params = {}) {
        return this.get('/products', params);
    }

    // 获取商品详情
    getProductDetail(id) {
        return this.get(`/products/${id}`);
    }

    // 获取热门商品
    getHotProducts(limit = 10) {
        return this.get('/products/hot/list', { limit });
    }

    // 获取推荐商品
    getRecommendProducts(limit = 10) {
        return this.get('/products/recommend/list', { limit });
    }

    // ========== 购物车相关 ==========
    
    // 获取购物车
    getCart() {
        return this.get('/cart');
    }

    // 添加到购物车
    addToCart(product_id, quantity = 1) {
        return this.post('/cart/add', { product_id, quantity });
    }

    // 更新购物车数量
    updateCartItem(id, quantity) {
        return this.put(`/cart/update/${id}`, { quantity });
    }

    // 删除购物车商品
    removeCartItem(id) {
        return this.delete(`/cart/remove/${id}`);
    }

    // 清空购物车
    clearCart() {
        return this.delete('/cart/clear');
    }

    // ========== 订单相关 ==========
    
    // 创建订单
    createOrder(data) {
        return this.post('/orders/create', data);
    }

    // 获取订单列表
    getOrders(params = {}) {
        return this.get('/orders', params);
    }

    // 获取订单详情
    getOrderDetail(id) {
        return this.get(`/orders/${id}`);
    }

    // 取消订单
    cancelOrder(id) {
        return this.put(`/orders/${id}/cancel`);
    }

    // 确认收货
    confirmOrder(id) {
        return this.put(`/orders/${id}/confirm`);
    }

    // ========== 地址相关 ==========
    
    // 获取地址列表
    getAddresses() {
        return this.get('/addresses');
    }

    // 获取地址详情
    getAddressDetail(id) {
        return this.get(`/addresses/${id}`);
    }

    // 添加地址
    addAddress(data) {
        return this.post('/addresses/add', data);
    }

    // 更新地址
    updateAddress(id, data) {
        return this.put(`/addresses/update/${id}`, data);
    }

    // 删除地址
    deleteAddress(id) {
        return this.delete(`/addresses/delete/${id}`);
    }

    // 设置默认地址
    setDefaultAddress(id) {
        return this.put(`/addresses/default/${id}`);
    }

    // ========== 分类相关 ==========
    
    // 获取分类列表
    getCategories() {
        return this.get('/categories');
    }

    // ========== 轮播图相关 ==========
    
    // 获取轮播图
    getBanners() {
        return this.get('/banners');
    }
}

// 创建全局API实例
const api = new API();

// 导出（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
}

