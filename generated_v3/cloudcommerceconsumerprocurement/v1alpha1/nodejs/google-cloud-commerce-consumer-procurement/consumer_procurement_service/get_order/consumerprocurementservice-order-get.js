// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START cloudcommerceconsumerprocurement_v1alpha1_consumerprocurementservice_order_get]
'use strict';

const {ConsumerProcurementServiceClient} =
  require('@google-cloud/procurement').v1alpha1;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves an order from Cloud Commerce Consumer Procurement.
 */
async function getOrder() {
  const client = new ConsumerProcurementServiceClient();

  const billingAccountId = 'example-billing-account-id';
  const orderId = 'example-order-id';
  const name = `billingAccounts/${billingAccountId}/orders/${orderId}`;

  const request = {
    name,
  };

  try {
    const [order] = await client.getOrder(request);

    console.log(`Order name: ${order.name}`);
    console.log(`Display name: ${order.displayName}`);
    console.log(`ETag: ${order.etag}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('The requested order was not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing the specified order.');
    } else if (err.code === status.INTERNAL) {
      console.error('An internal error occurred while retrieving the order.');
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = {getOrder};
// [END cloudcommerceconsumerprocurement_v1alpha1_consumerprocurementservice_order_get]
