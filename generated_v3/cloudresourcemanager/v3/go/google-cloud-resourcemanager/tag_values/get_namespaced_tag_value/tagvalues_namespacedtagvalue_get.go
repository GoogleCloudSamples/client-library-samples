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

// [START cloudresourcemanager_v3_tagvalues_namespacedtagvalue_get]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	"cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// getNamespacedTagValue retrieves a TagValue by its namespaced name.
func getNamespacedTagValue(ctx context.Context, w io.Writer, parentID string, tagKeyShortID string, tagValueShortID string) error {
	name := fmt.Sprintf("%s/%s/%s", parentID, tagKeyShortID, tagValueShortID)

	client, err := cloudresourcemanager.NewTagValuesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagValuesClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.GetNamespacedTagValueRequest{
		Name: name,
	}

	tagValue, err := client.GetNamespacedTagValue(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetNamespacedTagValue failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved namespaced TagValue: %s\n", tagValue.GetName())

	return nil
}

// [END cloudresourcemanager_v3_tagvalues_namespacedtagvalue_get]
