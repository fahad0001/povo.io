import Vue from 'vue'
import Router from 'vue-router'

import DemoPage from '@/containers/DemoPage'
import Home from '@/containers/Home'
import Account from '@/containers/Account'
import AccountEdit from '@/containers/AccountEdit'
import Poll from '@/containers/Poll'
import PollCreate from '@/containers/PollCreate'
import PollPreview from '@/containers/PollPreview'
import PollPublish from '@/containers/PollPublish'
import Rewards from '@/containers/Rewards'
import RewardsSingleView from '@/containers/RewardsSingleView'
import RewardsCart from '@/containers/RewardsCart'
import RewardsShippingAddress from '@/containers/RewardsShippingAddress'
import RewardsAddAddress from '@/containers/RewardsAddAddress'
import RewardsChooseAddress from '@/containers/RewardsChooseAddress'
import RewardsCartReview from '@/containers/RewardsCartReview'
import RewardsCartConfirmed from '@/containers/RewardsCartConfirmed'
import RewardsHistory from '@/containers/RewardsHistory'
import MyPolls from '@/containers/MyPolls'
import PollResults from '@/containers/PollResults'

import ConfirmationFinish from '@/containers/ConfirmationFinish'
import ConfirmationFailed from '@/containers/ConfirmationFailed'
import SetNewPassword from '@/containers/SetNewPassword'

// Static pages
import About from '@/pages/static/about'
import Faq from '@/pages/static/faq'
import Privacy from '@/pages/static/privacy'
import Terms from '@/pages/static/terms'

import guard from './guard'
import modalsGuard from './modalsGuard'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/confirmation_finish',
      name: 'Confirmation Finish',
      component: ConfirmationFinish
      // beforeEnter: guard.checkAuth
    },
    {
      path: '/confirmation_failed',
      name: 'Confirmation Failed',
      component: ConfirmationFailed
      // beforeEnter: guard.checkAuth
    },
    {
      path: '/set_new_password',
      name: 'Set New Password',
      component: SetNewPassword
      // beforeEnter: guard.checkAuth
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/account-edit',
      name: 'AccountEdit',
      component: AccountEdit,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/polls/:pollId',
      name: 'polls',
      component: Poll
    },
    {
      path: '/polls/:pollId/results',
      name: 'PollResults',
      component: PollResults,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/poll/create',
      name: 'PollCreate',
      component: PollCreate,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/poll/preview',
      name: 'PollPreview',
      component: PollPreview,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/poll/publish',
      name: 'PollPublish',
      component: PollPublish,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards',
      name: 'Rewards',
      component: Rewards,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards_single_view',
      name: 'RewardsSingleView',
      component: RewardsSingleView
    },
    {
      path: '/rewards/cart',
      name: 'RewardsCart',
      component: RewardsCart,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards/shipping_address',
      name: 'RewardsShippingAddress',
      component: RewardsShippingAddress,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards/add_address',
      name: 'RewardsAddAddress',
      component: RewardsAddAddress,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards/choose_address',
      name: 'RewardsChooseAddress',
      component: RewardsChooseAddress,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards/cart_review',
      name: 'RewardsCartReview',
      component: RewardsCartReview,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards/cart_confirmed',
      name: 'RewardsCartConfirmed',
      component: RewardsCartConfirmed,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/rewards_history',
      name: 'RewardsHistory',
      component: RewardsHistory
    },
    {
      path: '/my_polls',
      name: 'MyPolls',
      component: MyPolls,
      beforeEnter: guard.checkAuth
    },
    {
      path: '/pages',
      name: 'DemoPage',
      component: DemoPage
    },
    {
      path: '/about',
      name: 'About page',
      component: About
    },
    {
      path: '/faq',
      name: 'Faq page',
      component: Faq
    },
    {
      path: '/privacy',
      name: 'Privacy page',
      component: Privacy
    },
    {
      path: '/terms',
      name: 'Terms page',
      component: Terms
    }
  ]
})

router.beforeEach(modalsGuard)

export default router
