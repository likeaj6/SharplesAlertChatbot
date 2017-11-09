/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

/* =============================================
   =                   Setup                   =
   ============================================= */

/* ----------  External Libraries  ---------- */

import React from 'react';
import 'whatwg-fetch';

/* ----------  External UI Kit  ---------- */

import {
  Button,
  ButtonArea,
  CellBody,
  CellFooter,
  CellHeader,
  CellsTitle,
  Form,
  FormCell,
  Slider,
  Switch,
} from 'react-weui';

/* ----------  Internal Components  ---------- */

import ArrivalPeriod from './arrival-period.jsx';
import Environment from './environment.jsx';
import ItemCategory from './item-category.jsx';
import Loading from './loading.jsx';
import MenuItem from './menu-item.jsx';

/* ----------  Helpers  ---------- */

import WebviewControls from '../messenger-api-helpers/webview-controls';
import {dateString} from '../utils/date-string-format';

/* ----------  Models  ---------- */

import Item from '../models/item';
import User from '../models/user';

const {ENVIRONMENTS} = User;

/* =============================================
   =            React Application              =
   ============================================= */

export default class App extends React.PureComponent {

  /* =============================================
     =               Configuration               =
     ============================================= */

  /* ----------  Top-level App Constants  ---------- */

  static dateConfig = {
    month: 'long',
    day: 'numeric',
  }

  /**
   * Keeping the display labels in the front end as a separation of concerns
   * The actual values are being imported later via static attributes on
   * the models
   *
   * We have introduced an ordering dependency, but this is also the order that
   * we wish to display the options in the UI.
   */

  static itemCategories = [
    {
      title: 'Moisturizers',
      subtitle: 'Daily moisturizers & night creams',
      image: 'moisturizers-filtered-cropped.jpg',
    },
    {
      title: 'Cleansers',
      subtitle: 'Face washes, wipes & exfoliators',
      image: 'cleansers-filtered-cropped.jpg',
    },
    {
      title: 'Masks',
      subtitle: 'Face & sheet masks',
      image: 'masks-filtered-cropped.jpg',
    },
    {
      title: 'Lip Treatments',
      subtitle: 'Balms & sunscreen',
      image: 'lip-treatments-filtered-cropped.jpg',
    },
  ]

  static menuItems = [
    'Sausage Sandwiches - Choice of Mild or Hot Italian, Chicken or Tofurky Sausage with Peppers & Onions',
    'Crispy Tofu with Black Bean Sauce (v), Quinoa Pilaf with Mango & Spinach (v)',
    'Fresh Zucchini Saute',
    'Soup: New England Clam Chowder, Garden Vegetable',
    'Orange Brownie Bars',
    'Oven Roasted Chicken, Macaroni & Cheese',
    'Spanish Ginger Chickpea & Spinach Stew (v), Wild Mushroom Ragout',
    'Loaded Baked Potatoes & Potato Skins with All the Toppings',
    'Edamame Succotash, Sauteed Fresh Greens',
    'Marble Cake with Fudge Frosting',
  ]

  static arrivalPeriods = [
    '15 minutes before',
    '30 minutes before',
    'An hour before',
  ]

  /* ----------  React Configuration  ---------- */

  static propTypes = {
    userId: React.PropTypes.string.isRequired,
  }

  state = {
    dateOfBirth: null,
    giftCategory: null,
    arrivalPeriod: null,
    environment: null,
    menuItems: [],
    persist: true,
  }

  /* =============================================
     =               Helper Methods              =
     ============================================= */

  /* ----------  Communicate with Server  ---------- */

  /**
   * Pull saved data from the server, and populate the form
   * If there's an error, we log it to the console. Errors will not be availble
   * within the Messenger webview. If you need to see them 'live', switch to
   * an `alert()`.
   *
   * @returns {undefined}
   */
  pullData() {
    const endpoint = `/users/${this.props.userId}`;
    console.log(`Pulling data from ${endpoint}...`);

    fetch(endpoint)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        console.error(
          status,
          `Unable to fetch user data for User ${this.props.userId}'`
        );
      }).then((jsonResponse) => {
        console.log(`Data fetched successfully: ${jsonResponse}`);
        this.setState({
          ...jsonResponse,
          menuItems: new Set(jsonResponse.menuItems),
        });
      }).catch((err) => console.error('Error pulling data', err));
  }

  pushData() {
    const content = this.jsonState();
    console.log(`Push data: ${content}`);

    fetch(`/users/${this.props.userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: content,
    }).then((response) => {
      if (response.ok) {
        console.log('Data successfully updated on the server!');
        return;
      }

      console.error(
        response.status,
        `Unable to save user data for User ${this.props.userId}'`
      );
    }).catch((err) => console.error('Error pushing data', err)).then(() => {
      WebviewControls.close();
    });
  }

  /* ----------  Formatters  ---------- */

  // Format state for easy printing or transmission
  jsonState() {
    return JSON.stringify({
      ...this.state,
      menuItems: [...this.state.menuItems],
    });
  }

  /* ----------  State Handlers  ---------- */

  setGiftCategory(giftCategory) {
    console.log(`Gift Category: ${giftCategory}`);
    this.setState({giftCategory});
  }

  setArrivalPeriod(arrivalPeriod) {
    console.log(`Arrival Period: ${arrivalPeriod}`);
    this.setState({arrivalPeriod});
  }

  setEnvironment(envIndex) {
    const environment = ENVIRONMENTS[envIndex];
    console.log(`Environment: ${environment}`);
    this.setState({environment});
  }

  addMenuItem(type) {
    console.log(`Add menu item: ${type}`);
    const oldmenuItems = this.state.menuItems;
    const menuItems = new Set(oldmenuItems);
    menuItems.add(type);
    this.setState({menuItems});
  }

  removeMenuItem(type) {
    console.log(`Remove menu item: ${type}`);
    const oldmenuItems = this.state.menuItems;
    const menuItems = new Set(oldmenuItems);
    menuItems.delete(type);
    this.setState({menuItems});
  }

  setPersist(persist) {
    console.log(`Persist: ${JSON.stringify(persist)}`);
    this.setState({persist});
  }

  setDateOfBirth(dateOfBirth) {
    console.log(`Set date of birth: ${dateOfBirth}`);
    this.setState({dateOfBirth});
  }

  /* =============================================
     =              React Lifecycle              =
     ============================================= */

  componentWillMount() {
    this.pullData(); // Initial data fetch
  }

  /*
   * Provide the main structure of the resulting HTML
   * Delegates items out to specialized components
   *
   */
  render() {
    /**
     * If waiting for data, just show the loading spinner
     * and skip the rest of this function
     */
    if (!this.state.arrivalPeriod) {
       return <Loading />;
    }

    /* ----------  Setup Sections (anything dynamic or repeated) ---------- */
    const itemCategories =
    App.itemCategories.map(({title, subtitle, image}, index) => {
      const value = Item.CATEGORIES[index];
      return (
        <ItemCategory
          key={value}
          title={title}
          subtitle={subtitle}
          image={image}
          selected={value === this.state.giftCategory}
          setGiftCategory={() => this.setGiftCategory(value)}
        />
      );
    });

    const menuItems = App.menuItems.map((label, index) => {
      const value = User.MENU_ITEMS[index];
      const checked = this.state.menuItems.has(value);

      return (
        <MenuItem
          key={value}
          value={value}
          label={label}
          checked={checked}
          addMenuItem={this.addMenuItem.bind(this)}
          removeMenuItem={this.removeMenuItem.bind(this)}
        />
      );
    });

    const arrivalPeriods = App.arrivalPeriods.map((label, index) => {
      const value = User.ARRIVAL_PERIODS[index];
      return (
        <ArrivalPeriod
          key={label}
          label={label}
          value={value}
          selected={value === this.state.arrivalPeriod}
          setArrivalPeriod={this.setArrivalPeriod.bind(this)}
        />
      );
    });

    const {persist} = this.state;
    const persistSwitch = (
      <Switch
        defaultChecked={persist}
        onClick={() => this.setPersist(!persist)}
      />
    );

    /* ----------  Main Structure  ---------- */

    return (
      <div className='app'>
        <section>
          <CellsTitle>Current Preferred Menu Items:</CellsTitle>
          <Form checkbox>{menuItems}</Form>
        </section>

        <section id='arrival-periods'>
          <CellsTitle>When to alert you?</CellsTitle>
          <Form radio id='arrivalPeriod'>{arrivalPeriods}</Form>
        </section>

        <section>
          <Form>
            <FormCell switch>
              <CellBody>Save this info for next time</CellBody>
              <CellFooter>{persistSwitch}</CellFooter>
            </FormCell>
          </Form>
        </section>
        <ButtonArea className='see-options'>
          <Button onClick={() => this.pushData()}>Save My Preferences</Button>
        </ButtonArea>
      </div>
    );
  }
}
