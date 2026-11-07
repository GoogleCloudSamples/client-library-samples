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

package main

// [START billingbudgets_v1_cloudbilling_billingaccounts_list]

import (
	"context"
	"fmt"
	"io"

	billing "cloud.google.com/go/billing/apiv1"
	billingpb "cloud.google.com/go/billing/apiv1/billingpb"
	"google.golang.org/api/iterator"
)

// listBillingAccounts lists the billing accounts available to the caller.
func listBillingAccounts(ctx context.Context, w io.Writer) error {
	client, err := billing.NewCloudBillingClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudBillingClient failed: %w", err)
	}
	defer client.Close()

	req := &billingpb.ListBillingAccountsRequest{}
	it := client.ListBillingAccounts(ctx, req)
	var count int
	for {
		account, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListBillingAccounts: %w", err)
		}
		count++
		fmt.Fprintf(w, "- Name: %s, Display Name: %s, Open: %t\n", account.GetName(), account.GetDisplayName(), account.GetOpen())
	}
	if count == 0 {
		fmt.Fprintln(w, "No billing accounts found.")
	}

	return nil
}

// [END billingbudgets_v1_cloudbilling_billingaccounts_list]
