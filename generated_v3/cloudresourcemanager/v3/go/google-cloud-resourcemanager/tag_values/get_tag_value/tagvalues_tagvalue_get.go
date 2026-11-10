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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_get]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// getTagValue retrieves an existing TagValue resource.
func getTagValue(ctx context.Context, w io.Writer, tagValueID string) error {
	name := fmt.Sprintf("tagValues/%s", tagValueID)

	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.GetTagValueRequest{
		Name: name,
	}

	tagValue, err := client.GetTagValue(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetTagValue failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved TagValue: %s\n", tagValue.GetName())
	return nil
}

// [END cloudresourcemanager_v3_tagvalues_tagvalue_get]
