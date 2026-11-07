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

// [START retail_v2alpha_merchantcenteraccountlinkservice_merchantcenteraccountlink_delete]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	retailpb "cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteMerchantCenterAccountLink deletes a Merchant Center account link resource.
func deleteMerchantCenterAccountLink(ctx context.Context, w io.Writer, locationID string, catalogID string, merchantCenterAccountLinkID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/merchantCenterAccountLinks/%s", projectID, locationID, catalogID, merchantCenterAccountLinkID)

	client, err := retail.NewMerchantCenterAccountLinkClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMerchantCenterAccountLinkClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.DeleteMerchantCenterAccountLinkRequest{
		Name: name,
	}

	if err := client.DeleteMerchantCenterAccountLink(ctx, req); err != nil {
		if st, ok := status.FromError(err); ok && (st.Code() == codes.FailedPrecondition || st.Code() == codes.NotFound) {
			fmt.Fprintf(w, "DeleteMerchantCenterAccountLink: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("DeleteMerchantCenterAccountLink: %w", err)
	}

	fmt.Fprintf(w, "Deleted merchant center account link: %s\n", name)

	return nil
}

// [END retail_v2alpha_merchantcenteraccountlinkservice_merchantcenteraccountlink_delete]
