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

// [START discoveryengine_v1beta_userlicenseservice_userlicenses_batchupdate]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	"cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// batchUpdateUserLicenses updates user licenses in a user store in batches.
func batchUpdateUserLicenses(ctx context.Context, w io.Writer, projectID string, locationID string, userStoreID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/userStores/%s", projectID, locationID, userStoreID)
	inlineSource := &discoveryenginepb.BatchUpdateUserLicensesRequest_InlineSource{
		UserLicenses: []*discoveryenginepb.UserLicense{
			{
				UserPrincipal:          "user1@example.com",
				LicenseAssignmentState: discoveryenginepb.UserLicense_ASSIGNED,
			},
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"license_assignment_state"},
	}
	_ = updateMask

	client, err := discoveryengine.NewUserLicenseClient(ctx)
	if err != nil {
		return fmt.Errorf("NewUserLicenseClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.BatchUpdateUserLicensesRequest{
		Parent: parent,
		Source: &discoveryenginepb.BatchUpdateUserLicensesRequest_InlineSource_{
			InlineSource: inlineSource,
		},
	}

	op, err := client.BatchUpdateUserLicenses(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchUpdateUserLicenses failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Batch update completed: %v\n", resp)
	return nil
}

// [END discoveryengine_v1beta_userlicenseservice_userlicenses_batchupdate]
