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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_delete]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// deleteTagValue deletes an existing TagValue by its ID.
func deleteTagValue(ctx context.Context, w io.Writer, tagValueID string) error {
	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.DeleteTagValueRequest{
		Name: fmt.Sprintf("tagValues/%s", tagValueID),
	}

	op, err := client.DeleteTagValue(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteTagValue failed: %w", err)
	}

	deletedTagValue, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for DeleteTagValue operation failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted TagValue: %s\n", deletedTagValue.GetName())
	return nil
}

// [END cloudresourcemanager_v3_tagvalues_tagvalue_delete]
